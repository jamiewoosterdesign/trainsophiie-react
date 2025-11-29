import React, { useState, useEffect } from 'react';
import { LiveSimulator } from '../simulator/LiveSimulator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function WizardModal({ isOpen, onClose, initialMode = 'service' }) {
    const [mode, setMode] = useState(initialMode);
    const [step, setStep] = useState(1);
    const [isNestedStaffFlow, setIsNestedStaffFlow] = useState(false);
    const [formData, setFormData] = useState({
        // Service
        serviceName: '',
        priceMode: 'fixed',
        price: '',
        duration: '60 mins',
        serviceDesc: '',
        questions: [],
        outcome: 'transfer',
        deliveryMethods: { sms: true, email: false },
        // Staff
        firstName: '',
        lastName: '',
        role: '',
        department: '',
        phone: '',
        email: '',
        accessLevel: 'user',
        responsibilities: '',
        // Protocol
        protocolTriggerType: 'keyword',
        protocolTriggerInput: '',
        action: 'script',
        script: '',
        // Transfer
        transferName: '',
        transferType: 'warm',
        summary: 'Hi, I have {Caller Name} on the line who needs assistance with {Reason}. They mentioned {Key Details}.',
        routingType: 'Specific Person',
        routingPerson: 'Jamie Tester',
        ignoreBusinessHours: false
    });

    // Reset when opening
    useEffect(() => {
        if (isOpen) {
            setMode(initialMode);
            setStep(1);
            setIsNestedStaffFlow(false);
            // We might want to reset formData here too, or keep it if we want persistence?
            // For now, let's reset essential fields or just keep it simple.
        }
    }, [isOpen, initialMode]);

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            if (isNestedStaffFlow) {
                // Return to service flow
                setMode('service');
                setIsNestedStaffFlow(false);
                setStep(3); // Back to outcome step
            } else {
                onClose(); // Save & Close
            }
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            if (isNestedStaffFlow) {
                setMode('service');
                setIsNestedStaffFlow(false);
                setStep(3);
            }
        }
    };

    const switchToStaffFlow = () => {
        setMode('staff');
        setIsNestedStaffFlow(true);
        setStep(1);
    };

    // Helper to render steps
    const renderStepIndicator = (num, label) => {
        const isActive = step >= num;
        return (
            <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full transition-colors ${isActive ? 'bg-brand-600' : 'bg-gray-300'}`}></span>
                <span className={`text-xs font-semibold transition-colors ${isActive ? 'text-brand-600' : 'text-gray-400'}`}>{label}</span>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-5xl h-[85vh] p-0 gap-0 overflow-hidden flex">

                {/* LEFT COLUMN: Form */}
                <div className="w-3/5 flex flex-col border-r border-gray-200 h-full">
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-100">
                        <DialogTitle className="text-xl font-bold text-slate-900 mb-2">
                            {mode === 'service' && 'Add New Service'}
                            {mode === 'staff' && 'Add Team Member'}
                            {mode === 'protocol' && 'Add New Protocol'}
                            {mode === 'transfer' && 'Add Transfer Rule'}
                        </DialogTitle>
                        <div className="flex items-center gap-2 mt-2">
                            {renderStepIndicator(1, mode === 'service' ? 'Basics' : mode === 'staff' ? 'Profile' : mode === 'protocol' ? 'Trigger' : 'Strategy')}
                            <div className="w-8 h-px bg-gray-200"></div>
                            {renderStepIndicator(2, mode === 'service' ? 'Knowledge' : mode === 'staff' ? 'Responsibilities' : mode === 'protocol' ? 'Action' : 'Handoff')}
                            <div className="w-8 h-px bg-gray-200"></div>
                            {renderStepIndicator(3, mode === 'service' ? 'Outcome' : mode === 'staff' ? 'Transfer Rules' : mode === 'protocol' ? 'Review' : 'Routing')}
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="flex-1 overflow-y-auto p-8 relative">

                        {/* SERVICE FORM */}
                        {mode === 'service' && (
                            <>
                                {step === 1 && (
                                    <div className="animate-fade-in space-y-6">
                                        <div className="space-y-2">
                                            <Label>Service Name</Label>
                                            <Input
                                                value={formData.serviceName}
                                                onChange={(e) => updateField('serviceName', e.target.value)}
                                                placeholder="e.g., Leaking Tap Repair"
                                            />
                                            <p className="text-xs text-slate-500 flex items-start gap-2"><i className="fa-solid fa-circle-info text-brand-500 mt-0.5"></i> This is what Sophiie listens for. Be specific but common.</p>
                                        </div>

                                        <div className="space-y-3">
                                            <Label>Service Pricing Mode</Label>
                                            <RadioGroup value={formData.priceMode} onValueChange={(val) => updateField('priceMode', val)} className="flex gap-3 mb-4">
                                                {['fixed', 'hourly', 'range', 'na'].map(m => (
                                                    <div key={m} className="flex items-center space-x-2">
                                                        <RadioGroupItem value={m} id={m} className="peer sr-only" />
                                                        <Label
                                                            htmlFor={m}
                                                            className={`px-4 py-2 border rounded-full text-sm transition-colors cursor-pointer flex items-center gap-2 peer-data-[state=checked]:border-brand-500 peer-data-[state=checked]:bg-brand-50 peer-data-[state=checked]:text-brand-600 font-medium border-gray-200 text-slate-600 hover:bg-gray-50`}
                                                        >
                                                            {m === 'fixed' && 'Fixed Price'}
                                                            {m === 'hourly' && 'Hourly Rate'}
                                                            {m === 'range' && 'Price Range'}
                                                            {m === 'na' && 'Not Applicable'}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                            <Input
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) => updateField('price', e.target.value)}
                                                placeholder="Enter price..."
                                                disabled={formData.priceMode === 'na'}
                                            />
                                        </div>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div className="animate-fade-in space-y-6">
                                        <div className="space-y-2">
                                            <Label>Description</Label>
                                            <Textarea
                                                rows={3}
                                                value={formData.serviceDesc}
                                                onChange={(e) => updateField('serviceDesc', e.target.value)}
                                                placeholder="Describe what this service entails..."
                                                className="resize-none"
                                            />
                                        </div>
                                        {/* Questions - Simplified */}
                                        <div className="space-y-2">
                                            <Label>Pre-Qualifying Questions</Label>
                                            <div className="flex gap-2">
                                                <Input type="text" placeholder="Type a question..." />
                                                <Button variant="secondary">Add</Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {step === 3 && (
                                    <div className="animate-fade-in space-y-6">
                                        <Label>Outcome</Label>
                                        <RadioGroup value={formData.outcome} onValueChange={(val) => updateField('outcome', val)} className="grid grid-cols-3 gap-4 mb-6">
                                            {['transfer', 'book', 'info'].map(o => (
                                                <div key={o}>
                                                    <RadioGroupItem value={o} id={`outcome-${o}`} className="peer sr-only" />
                                                    <Label
                                                        htmlFor={`outcome-${o}`}
                                                        className={`h-full p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center cursor-pointer peer-data-[state=checked]:border-brand-500 peer-data-[state=checked]:bg-brand-50 border-gray-200 hover:border-gray-300`}
                                                    >
                                                        <span className="font-semibold text-sm text-slate-800 capitalize">{o}</span>
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>

                                        {formData.outcome === 'transfer' && (
                                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
                                                <Label>Select Team</Label>
                                                <Select>
                                                    <SelectTrigger className="bg-white">
                                                        <SelectValue placeholder="Select a team member" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="reception">Reception Desk (Default)</SelectItem>
                                                        <SelectItem value="jamie">Jamie Tester</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Button variant="link" onClick={switchToStaffFlow} className="p-0 h-auto text-brand-600 text-sm font-medium hover:underline">+ Add New Team Member</Button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        {/* STAFF FORM */}
                        {mode === 'staff' && (
                            <>
                                {isNestedStaffFlow && (
                                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4 flex items-center gap-3 text-sm text-blue-800">
                                        <i className="fa-solid fa-info-circle"></i><span>Creating new member for Service Rule.</span>
                                    </div>
                                )}
                                {step === 1 && (
                                    <div className="animate-fade-in space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label>First Name</Label>
                                                <Input
                                                    value={formData.firstName}
                                                    onChange={(e) => updateField('firstName', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Last Name</Label>
                                                <Input
                                                    value={formData.lastName}
                                                    onChange={(e) => updateField('lastName', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Role</Label>
                                            <Input
                                                value={formData.role}
                                                onChange={(e) => updateField('role', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div className="animate-fade-in space-y-2">
                                        <Label>Responsibilities</Label>
                                        <Textarea
                                            rows={4}
                                            value={formData.responsibilities}
                                            onChange={(e) => updateField('responsibilities', e.target.value)}
                                            className="resize-none"
                                        />
                                    </div>
                                )}
                                {step === 3 && (
                                    <div className="animate-fade-in space-y-4">
                                        <Label>Transfer Conditions</Label>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <p className="text-xs text-slate-400 mb-3">If a user says these, transfer immediately.</p>
                                            <Button variant="link" className="p-0 h-auto text-brand-600 text-sm font-medium hover:underline">+ Add Keyword</Button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* PROTOCOL FORM */}
                        {mode === 'protocol' && (
                            <>
                                {step === 1 && (
                                    <div className="animate-fade-in space-y-4">
                                        <Label>Trigger Condition</Label>
                                        <RadioGroup value={formData.protocolTriggerType} onValueChange={(val) => updateField('protocolTriggerType', val)} className="grid grid-cols-2 gap-4">
                                            <div>
                                                <RadioGroupItem value="keyword" id="trig-keyword" className="peer sr-only" />
                                                <Label htmlFor="trig-keyword" className="block p-4 border-2 rounded-lg transition-all h-full cursor-pointer peer-data-[state=checked]:border-brand-500 peer-data-[state=checked]:bg-brand-50 border-gray-200">
                                                    <div className="font-semibold text-slate-800 mb-1">Specific Keywords</div>
                                                </Label>
                                            </div>
                                            <div>
                                                <RadioGroupItem value="intent" id="trig-intent" className="peer sr-only" />
                                                <Label htmlFor="trig-intent" className="block p-4 border-2 rounded-lg transition-all h-full cursor-pointer peer-data-[state=checked]:border-brand-500 peer-data-[state=checked]:bg-brand-50 border-gray-200">
                                                    <div className="font-semibold text-slate-800 mb-1">Customer Intent</div>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div className="animate-fade-in space-y-2">
                                        <Label>Required Action</Label>
                                        <Select value={formData.action} onValueChange={(val) => updateField('action', val)}>
                                            <SelectTrigger className="bg-white">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="script">Follow a Script / Give Info</SelectItem>
                                                <SelectItem value="transfer">Transfer to Team</SelectItem>
                                                <SelectItem value="refuse">Politely Refuse</SelectItem>
                                                <SelectItem value="collect">Collect Info & Park</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                {step === 3 && (
                                    <div className="animate-fade-in text-center py-8">
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-800 mb-2">Protocol Ready</h3>
                                    </div>
                                )}
                            </>
                        )}

                        {/* TRANSFER FORM */}
                        {mode === 'transfer' && (
                            <>
                                {step === 1 && (
                                    <div className="animate-fade-in space-y-2">
                                        <Label>Transfer Rule Name</Label>
                                        <Input
                                            value={formData.transferName}
                                            onChange={(e) => updateField('transferName', e.target.value)}
                                        />
                                    </div>
                                )}
                                {step === 2 && (
                                    <div className="animate-fade-in space-y-2">
                                        <Label>Summary Format</Label>
                                        <Textarea
                                            rows={4}
                                            value={formData.summary}
                                            onChange={(e) => updateField('summary', e.target.value)}
                                            className="text-sm font-mono bg-gray-50"
                                        />
                                    </div>
                                )}
                                {step === 3 && (
                                    <div className="animate-fade-in space-y-2">
                                        <Label>Routing Logic</Label>
                                        <Select>
                                            <SelectTrigger className="bg-white">
                                                <SelectValue placeholder="Select routing logic" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="specific">Specific Person</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </>
                        )}

                    </div>

                    {/* Footer */}
                    <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 rounded-bl-2xl flex justify-between items-center">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={step === 1 && !isNestedStaffFlow}
                            className="text-slate-600 hover:bg-gray-200"
                        >
                            Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            className="bg-brand-600 hover:bg-brand-700 text-white shadow-md active:scale-95"
                        >
                            {step === 3 ? (isNestedStaffFlow ? 'Create & Return' : 'Save & Close') : 'Next Step'}
                        </Button>
                    </div>
                </div>

                {/* RIGHT COLUMN: Simulator */}
                <LiveSimulator mode={mode} step={step} data={formData} />

            </DialogContent>
        </Dialog>
    );
}
