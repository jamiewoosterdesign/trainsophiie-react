import React from 'react';

export function ServicesView({ onOpenWizard }) {
    return (
        <div className="view-section flex flex-col h-full w-full">
            <header className="bg-white border-b border-gray-100 px-8 py-5 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Services Configuration</h1>
                    <p className="text-slate-500 text-sm mt-1">Teach Sophiie what services you offer and how to handle them.</p>
                </div>
                <button
                    onClick={() => onOpenWizard('service')}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg shadow-sm font-medium flex items-center gap-2 transition-all active:scale-95"
                >
                    <i className="fa-solid fa-plus"></i> Add New Service
                </button>
            </header>

            <div className="flex-1 overflow-y-auto p-8 bg-gray-50/50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Service Card 1 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                <i className="fa-solid fa-faucet text-xl"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded">Active</span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">Emergency Plumbing</h3>
                        <p className="text-sm text-slate-500 mb-4 line-clamp-2">Handling burst pipes, leaks, and overflowing toilets.</p>
                        <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-gray-100">
                            <span className="flex items-center gap-1"><i className="fa-regular fa-clock"></i> 60 min</span>
                            <span className="flex items-center gap-1"><i className="fa-solid fa-share-nodes"></i> Transfer</span>
                        </div>
                    </div>

                    {/* Service Card 2 */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all group cursor-pointer relative overflow-hidden hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <i className="fa-solid fa-fire-burner text-xl"></i>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 px-2 py-1 rounded">Active</span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1">Gas Fitting</h3>
                        <p className="text-sm text-slate-500 mb-4 line-clamp-2">Installation and maintenance of gas appliances.</p>
                        <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-gray-100">
                            <span className="flex items-center gap-1"><i className="fa-regular fa-clock"></i> 90 min</span>
                            <span className="flex items-center gap-1"><i className="fa-regular fa-calendar-check"></i> Book</span>
                        </div>
                    </div>

                    {/* Add New Placeholder */}
                    <button
                        onClick={() => onOpenWizard('service')}
                        className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-brand-500 hover:text-brand-500 hover:bg-brand-50/50 transition-all bg-transparent h-full min-h-[240px]"
                    >
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-plus text-lg text-brand-500"></i>
                        </div>
                        <span className="font-medium">Create New Service</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
