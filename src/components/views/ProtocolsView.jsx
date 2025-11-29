import React from 'react';

export function ProtocolsView({ onOpenWizard }) {
    return (
        <div className="view-section flex flex-col h-full w-full">
            <header className="bg-white border-b border-gray-100 px-8 py-5 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Protocols & Behavior</h1>
                    <p className="text-slate-500 text-sm mt-1">Define global guardrails and specific operational workflows.</p>
                </div>
                <button
                    onClick={() => onOpenWizard('protocol')}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium flex items-center gap-2 transition-all active:scale-95"
                >
                    <i className="fa-solid fa-plus"></i> Add Protocol
                </button>
            </header>

            <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50 space-y-8">

                {/* Section 1: Specific Workflows */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg"><i className="fa-solid fa-route"></i></div>
                        <h3 className="text-lg font-bold text-slate-800">Specific Workflows</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Workflow Card */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-xs font-bold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-2 py-1 rounded">If / Then</span>
                                <button className="text-gray-300 hover:text-gray-500"><i className="fa-solid fa-ellipsis"></i></button>
                            </div>
                            <h4 className="font-bold text-slate-900 mb-1">Refund Request</h4>
                            <p className="text-xs text-slate-500 mb-4">Trigger: User asks for money back.</p>
                            <div className="flex items-center gap-2 text-xs text-slate-600 bg-gray-50 p-2 rounded border border-gray-100">
                                <i className="fa-solid fa-arrow-right-long text-gray-400"></i>
                                <span>Transfer to Accounts Team</span>
                            </div>
                        </div>

                        {/* Workflow Card */}
                        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-xs font-bold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-2 py-1 rounded">If / Then</span>
                                <button className="text-gray-300 hover:text-gray-500"><i className="fa-solid fa-ellipsis"></i></button>
                            </div>
                            <h4 className="font-bold text-slate-900 mb-1">Job Application</h4>
                            <p className="text-xs text-slate-500 mb-4">Trigger: User wants to work here.</p>
                            <div className="flex items-center gap-2 text-xs text-slate-600 bg-gray-50 p-2 rounded border border-gray-100">
                                <i className="fa-solid fa-arrow-right-long text-gray-400"></i>
                                <span>Direct to website / Careers</span>
                            </div>
                        </div>

                        {/* Add New Workflow */}
                        <button
                            onClick={() => onOpenWizard('protocol')}
                            className="border-2 border-dashed border-gray-300 rounded-xl p-5 flex flex-col items-center justify-center text-gray-400 hover:border-brand-500 hover:text-brand-500 hover:bg-brand-50/50 transition-all bg-transparent min-h-[140px]"
                        >
                            <i className="fa-solid fa-plus mb-2"></i>
                            <span className="text-sm font-medium">Create Workflow</span>
                        </button>
                    </div>
                </div>

                {/* Section 2: Global Guardrails */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-red-100 text-red-600 rounded-lg"><i className="fa-solid fa-shield-halved"></i></div>
                        <h3 className="text-lg font-bold text-slate-800">Global Restrictions & Guardrails</h3>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <p className="text-sm text-slate-500 mb-6">Define strict limits for the AI. These are <strong>negative constraints</strong> that apply to every call.</p>

                        <div className="space-y-4">
                            {/* Guardrail Item 1 */}
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    <div className="text-sm text-slate-700">
                                        <span className="font-bold text-slate-600 uppercase text-xs mr-1">Sophiie Must Never</span>
                                        quote specific pricing unless explicitly listed in Services.
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-red-500"><i className="fa-solid fa-trash"></i></button>
                            </div>

                            {/* Guardrail Item 2 */}
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    <div className="text-sm text-slate-700">
                                        <span className="font-bold text-slate-600 uppercase text-xs mr-1">Sophiie Must Never</span>
                                        promise specific arrival times (give 2hr windows only).
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-red-500"><i className="fa-solid fa-trash"></i></button>
                            </div>

                            {/* Strict Input Area */}
                            <div className="flex items-center gap-2 pt-3 mt-2 border-t border-gray-100">
                                <div className="flex-1 relative">
                                    <div className="absolute left-4 top-3 text-slate-500 font-bold text-sm select-none pointer-events-none uppercase tracking-wide text-xs">Sophiie must NEVER</div>
                                    <input type="text" className="w-full pl-40 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-white placeholder-gray-400" placeholder="e.g. discuss politics or religion..." />
                                </div>
                                <button className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm">
                                    Add Restriction
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
