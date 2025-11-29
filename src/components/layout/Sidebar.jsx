import React from 'react';

export function Sidebar({ currentView, onSwitchView }) {
    const isActive = (view) => currentView === view;

    return (
        <>
            {/* TIER 1: Sidebar */}
            <aside className="w-[72px] bg-[#020617] flex flex-col items-center py-6 z-30 flex-shrink-0 shadow-xl text-white">
                <div className="mb-10 text-2xl opacity-90 hover:opacity-100 cursor-pointer">
                    <i className="fa-solid fa-headset"></i>
                </div>

                <nav className="flex-1 w-full flex flex-col gap-7 px-2 items-center">
                    <a href="#" className="text-xl text-white opacity-60 hover:opacity-100 transition-opacity nav-icon-btn">
                        <i className="fa-regular fa-envelope"></i>
                    </a>

                    {/* People (Staff View Trigger) */}
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); onSwitchView('staff'); }}
                        className={`text-xl text-white transition-all nav-icon-btn ${isActive('staff') ? 'active opacity-100' : 'opacity-60 hover:opacity-100'}`}
                    >
                        <i className="fa-solid fa-user-group"></i>
                    </a>

                    {/* Wrench (Services View Trigger) */}
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); onSwitchView('services'); }}
                        className={`text-xl text-white transition-all nav-icon-btn ${isActive('services') ? 'active opacity-100' : 'opacity-60 hover:opacity-100'}`}
                    >
                        <i className="fa-solid fa-screwdriver-wrench"></i>
                    </a>

                    {/* Protocols (Trigger) */}
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); onSwitchView('protocols'); }}
                        className={`text-xl text-white transition-all nav-icon-btn ${isActive('protocols') ? 'active opacity-100' : 'opacity-60 hover:opacity-100'}`}
                    >
                        <i className="fa-solid fa-list-check"></i>
                    </a>

                    {/* Transfers (Trigger) */}
                    <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); onSwitchView('transfers'); }}
                        className={`text-xl text-white transition-all nav-icon-btn ${isActive('transfers') ? 'active opacity-100' : 'opacity-60 hover:opacity-100'}`}
                    >
                        <i className="fa-solid fa-arrow-right-arrow-left"></i>
                    </a>

                    <a href="#" className="text-xl text-white opacity-60 hover:opacity-100 transition-opacity nav-icon-btn">
                        <i className="fa-regular fa-calendar"></i>
                    </a>

                    <a href="#" className="text-xl text-white opacity-60 hover:opacity-100 transition-opacity nav-icon-btn">
                        <i className="fa-solid fa-list-check"></i>
                    </a>

                    <a href="#" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-400 mt-2 mb-2">
                        <i className="fa-solid fa-robot text-lg"></i>
                    </a>

                    <a href="#" className="text-xl text-white opacity-60 hover:opacity-100 transition-opacity nav-icon-btn">
                        <i className="fa-solid fa-gear"></i>
                    </a>

                    <a href="#" className="text-xl text-white opacity-60 hover:opacity-100 transition-opacity nav-icon-btn">
                        <i className="fa-regular fa-circle-question"></i>
                    </a>
                </nav>

                <div className="mt-4 w-10 h-10 rounded-xl bg-gradient-to-b from-lime-400 to-emerald-500 cursor-pointer shadow-lg hover:opacity-90 transition-opacity">
                </div>
            </aside>

            {/* TIER 2: Inner Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full flex-shrink-0 z-20">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Module</h2>
                    <div className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        Train Sophiie
                        <span className="bg-brand-100 text-brand-700 text-[10px] px-2 py-0.5 rounded-full">Beta</span>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
                    {/* Group: Knowledge Base */}
                    <div>
                        <h3 className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Knowledge Base</h3>
                        <ul className="space-y-1">
                            <li>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onSwitchView('services'); }}
                                    className={isActive('services')
                                        ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-brand-50 text-brand-700 font-medium"
                                        : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors"}
                                >
                                    <i className={`fa-solid fa-wrench w-5 ${isActive('services') ? 'text-brand-500' : 'text-slate-400'}`}></i>
                                    Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onSwitchView('protocols'); }}
                                    className={isActive('protocols')
                                        ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-brand-50 text-brand-700 font-medium"
                                        : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors"}
                                >
                                    <i className={`fa-solid fa-shield-halved w-5 ${isActive('protocols') ? 'text-brand-500' : 'text-slate-400'}`}></i>
                                    Protocols
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors">
                                    <i className="fa-solid fa-file-shield w-5 text-slate-400"></i>
                                    Policies
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors">
                                    <i className="fa-solid fa-circle-question w-5 text-slate-400"></i>
                                    FAQs
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Group: Team & Routing */}
                    <div>
                        <h3 className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Team & Routing</h3>
                        <ul className="space-y-1">
                            <li>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onSwitchView('staff'); }}
                                    className={isActive('staff')
                                        ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-brand-50 text-brand-700 font-medium"
                                        : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors"}
                                >
                                    <i className={`fa-solid fa-users w-5 ${isActive('staff') ? 'text-brand-500' : 'text-slate-400'}`}></i>
                                    Staff
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors">
                                    <i className="fa-solid fa-sitemap w-5 text-slate-400"></i>
                                    Departments
                                </a>
                            </li>
                            {/* New Transfers Link */}
                            <li>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onSwitchView('transfers'); }}
                                    className={isActive('transfers')
                                        ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-brand-50 text-brand-700 font-medium"
                                        : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors"}
                                >
                                    <i className={`fa-solid fa-arrow-right-arrow-left w-5 ${isActive('transfers') ? 'text-brand-500' : 'text-slate-400'}`}></i>
                                    Transfers
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Group: Persona */}
                    <div>
                        <h3 className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Persona</h3>
                        <ul className="space-y-1">
                            <li>
                                <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors">
                                    <i className="fa-solid fa-microphone-lines w-5 text-slate-400"></i>
                                    Voice & Tone
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors">
                                    <i className="fa-solid fa-hand-sparkles w-5 text-slate-400"></i>
                                    Greetings
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-500">Setup Progress</span>
                        <span className="text-xs font-bold text-brand-600">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                </div>
            </aside>
        </>
    );
}
