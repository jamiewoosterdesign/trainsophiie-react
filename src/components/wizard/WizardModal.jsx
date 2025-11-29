import React, { useState, useEffect } from 'react';
import { LiveSimulator } from '../simulator/LiveSimulator';

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

    if (!isOpen) return null;

    // Helper to render steps
    const renderStepIndicator = (num, label) => {
        const isActive = step >= num;
        const isCurrent = step === num;
        return (
            <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full transition-colors ${isActive ? 'bg-brand-600' : 'bg-gray-300'}`}></span>
                <span className={`text-xs font-semibold transition-colors ${isActive ? 'text-brand-600' : 'text-gray-400'}`}>{label}</span>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity animate-fade-in">
            <div className="bg-white w-[90vw] max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex overflow-hidden transform transition-transform duration-300 relative animate-pop-in">

                {/* LEFT COLUMN: Form */}
                <div className="w-3/5 flex flex-col border-r border-gray-200">
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">
                                {mode === 'service' && 'Add New Service'}
                                {mode === 'staff' && 'Add Team Member'}
                                {mode === 'protocol' && 'Add New Protocol'}
                                {mode === 'transfer' && 'Add Transfer Rule'}
                            </h2>
                            <div className="flex items-center gap-2 mt-2">
                                {renderStepIndicator(1, mode === 'service' ? 'Basics' : mode === 'staff' ? 'Profile' : mode === 'protocol' ? 'Trigger' : 'Strategy')}
                                <div className="w-8 h-px bg-gray-200"></div>
                                {renderStepIndicator(2, mode === 'service' ? 'Knowledge' : mode === 'staff' ? 'Responsibilities' : mode === 'protocol' ? 'Action' : 'Handoff')}
                                <div className="w-8 h-px bg-gray-200"></div>
                                {renderStepIndicator(3, mode === 'service' ? 'Outcome' : mode === 'staff' ? 'Transfer Rules' : mode === 'protocol' ? 'Review' : 'Routing')}
                            </div>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                            <i className="fa-solid fa-xmark text-lg"></i>
                        </button>
                    </div>

                    {/* Form Content */}
                    <div className="flex-1 overflow-y-auto p-8 relative">

                        {/* SERVICE FORM */}
                        {mode === 'service' && (
                            <>
                                {step === 1 && (
                                    <div className="animate-fade-in">
                                        <div className="mb-6">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Service Name</label>
                                            <input
                                                type="text"
                                                value={formData.serviceName}
                                                onChange={(e) => updateField('serviceName', e.target.value)}
                                                placeholder="e.g., Leaking Tap Repair"
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                                            />
                                            <p className="text-xs text-slate-500 mt-2 flex items-start gap-2"><i className="fa-solid fa-circle-info text-brand-500 mt-0.5"></i> This is what Sophiie listens for. Be specific but common.</p>
                                        </div>
                                        {/* Pricing Mode - Simplified for brevity */}
                                        <div className="mb-6">
                                            <label className="block text-sm font-semibold text-slate-700 mb-3">Service Pricing Mode</label>
                                            <div className="flex gap-3 mb-4 overflow-x-auto pb-1">
                                                {['fixed', 'hourly', 'range', 'na'].map(m => (
                                                    <label key={m} className="cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="priceMode"
                                                            value={m}
                                                            checked={formData.priceMode === m}
                                                            onChange={(e) => updateField('priceMode', e.target.value)}
                                                            className="hidden"
                                                        />
                                                        <div className={`px-4 py-2 border rounded-full text-sm transition-colors flex items-center gap-2 ${formData.priceMode === m ? 'border-brand-500 bg-brand-50 text-brand-600 font-semibold' : 'border-gray-200 text-slate-600 hover:bg-gray-50'}`}>
                                                            {m === 'fixed' && 'Fixed Price'}
                                                            {m === 'hourly' && 'Hourly Rate'}
                                                            {m === 'range' && 'Price Range'}
                                                            {m === 'na' && 'Not Applicable'}
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                            <input
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) => updateField('price', e.target.value)}
                                                placeholder="Enter price..."
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                                                disabled={formData.priceMode === 'na'}
                                            />
                                        </div>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div className="animate-fade-in">
                                        <div className="mb-6">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                                            <textarea
                                                rows="3"
                                                value={formData.serviceDesc}
                                                onChange={(e) => updateField('serviceDesc', e.target.value)}
                                                placeholder="Describe what this service entails..."
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                                            ></textarea>
                                        </div>
                                        {/* Questions - Simplified */}
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Pre-Qualifying Questions</label>
                                            <div className="flex gap-2">
                                                <input type="text" placeholder="Type a question..." className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm" />
                                                <button className="bg-gray-100 hover:bg-gray-200 text-slate-700 px-4 py-2 rounded-lg font-medium text-sm">Add</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {step === 3 && (
                                    <div className="animate-fade-in">
                                        <label className="block text-sm font-semibold text-slate-700 mb-4">Outcome</label>
                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            {['transfer', 'book', 'info'].map(o => (
                                                <label key={o} className="cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="outcome"
                                                        value={o}
                                                        checked={formData.outcome === o}
                                                        onChange={(e) => updateField('outcome', e.target.value)}
                                                        className="hidden"
                                                    />
                                                    <div className={`h-full p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center ${formData.outcome === o ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                                        <span className="font-semibold text-sm text-slate-800 capitalize">{o}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                        {formData.outcome === 'transfer' && (
                                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Select Team</label>
                                                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-sm">
                                                    <option>Reception Desk (Default)</option>
                                                </select>
                                                <button onClick={switchToStaffFlow} className="mt-2 text-brand-600 text-sm font-medium hover:underline">+ Add New Team Member</button>
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
                                    <div className="animate-fade-in">
                                        <div className="grid grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.firstName}
                                                    onChange={(e) => updateField('firstName', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.lastName}
                                                    onChange={(e) => updateField('lastName', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                                            <input
                                                type="text"
                                                value={formData.role}
                                                onChange={(e) => updateField('role', e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div className="animate-fade-in">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Responsibilities</label>
                                        <textarea
                                            rows="4"
                                            value={formData.responsibilities}
                                            onChange={(e) => updateField('responsibilities', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none resize-none"
                                        ></textarea>
                                    </div>
                                )}
                                {step === 3 && (
                                    <div className="animate-fade-in">
                                        <label className="block text-sm font-semibold text-slate-700 mb-4">Transfer Conditions</label>
                                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            <p className="text-xs text-slate-400 mb-3">If a user says these, transfer immediately.</p>
                                            <button className="text-brand-600 text-sm font-medium hover:underline">+ Add Keyword</button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {/* PROTOCOL FORM */}
                        {mode === 'protocol' && (
                            <>
                                {step === 1 && (
                                    <div className="animate-fade-in">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Trigger Condition</label>
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <label className="cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name="protocolTrigger"
                                                    value="keyword"
                                                    checked={formData.protocolTriggerType === 'keyword'}
                                                    onChange={(e) => updateField('protocolTriggerType', e.target.value)}
                                                    className="hidden"
                                                />
                                                <div className={`p-4 border-2 rounded-lg transition-all h-full ${formData.protocolTriggerType === 'keyword' ? 'border-brand-500 bg-brand-50' : 'border-gray-200'}`}>
                                                    <div className="font-semibold text-slate-800 mb-1">Specific Keywords</div>
                                                </div>
                                            </label>
                                            <label className="cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name="protocolTrigger"
                                                    value="intent"
                                                    checked={formData.protocolTriggerType === 'intent'}
                                                    onChange={(e) => updateField('protocolTriggerType', e.target.value)}
                                                    className="hidden"
                                                />
                                                <div className={`p-4 border-2 rounded-lg transition-all h-full ${formData.protocolTriggerType === 'intent' ? 'border-brand-500 bg-brand-50' : 'border-gray-200'}`}>
                                                    <div className="font-semibold text-slate-800 mb-1">Customer Intent</div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div className="animate-fade-in">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Required Action</label>
                                        <select
                                            value={formData.action}
                                            onChange={(e) => updateField('action', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white mb-4"
                                        >
                                            <option value="script">Follow a Script / Give Info</option>
                                            <option value="transfer">Transfer to Team</option>
                                            <option value="refuse">Politely Refuse</option>
                                            <option value="collect">Collect Info & Park</option>
                                        </select>
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
                                    <div className="animate-fade-in">
                                        <div className="mb-6">
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Transfer Rule Name</label>
                                            <input
                                                type="text"
                                                value={formData.transferName}
                                                onChange={(e) => updateField('transferName', e.target.value)}
                                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none"
                                            />
                                        </div>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div className="animate-fade-in">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Summary Format</label>
                                        <textarea
                                            rows="4"
                                            value={formData.summary}
                                            onChange={(e) => updateField('summary', e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none text-sm font-mono bg-gray-50"
                                        ></textarea>
                                    </div>
                                )}
                                {step === 3 && (
                                    <div className="animate-fade-in">
                                        <label className="block text-sm font-semibold text-slate-700 mb-4">Routing Logic</label>
                                        <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white text-sm">
                                            <option>Specific Person</option>
                                        </select>
                                    </div>
                                )}
                            </>
                        )}

                    </div>

                    {/* Footer */}
                    <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 rounded-bl-2xl flex justify-between items-center">
                        <button
                            onClick={handleBack}
                            disabled={step === 1 && !isNestedStaffFlow}
                            className="px-5 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            className="px-6 py-2.5 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 shadow-md transition-all active:scale-95"
                        >
                            {step === 3 ? (isNestedStaffFlow ? 'Create & Return' : 'Save & Close') : 'Next Step'}
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN: Simulator */}
                <LiveSimulator mode={mode} step={step} data={formData} />

            </div>
        </div>
    );
}
