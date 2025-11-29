import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

export function Sidebar({ currentView, onSwitchView }) {
    const mainNavItems = [
        { id: 'services', icon: 'fa-solid fa-list-check', label: 'Services' },
        { id: 'staff', icon: 'fa-solid fa-users', label: 'Team' },
        { id: 'protocols', icon: 'fa-solid fa-book-open', label: 'Protocols' },
        { id: 'transfers', icon: 'fa-solid fa-share-from-square', label: 'Transfers' },
    ];

    return (
        <div className="flex h-full">
            {/* TIER 1: Primary Navigation (Dark Blue) */}
            <aside className="w-[72px] bg-slate-900 flex flex-col items-center py-6 z-20">
                <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white text-xl font-bold mb-8 shadow-lg shadow-brand-900/50">
                    S
                </div>

                <nav className="flex-1 flex flex-col gap-4 w-full px-3">
                    <button className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center transition-all hover:bg-brand-600 hover:scale-105 hover:shadow-lg hover:shadow-brand-900/50 group relative">
                        <i className="fa-solid fa-house"></i>
                        <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Dashboard</span>
                    </button>
                    <button className="w-12 h-12 rounded-xl text-slate-400 flex items-center justify-center transition-all hover:bg-white/10 hover:text-white group relative">
                        <i className="fa-solid fa-chart-pie"></i>
                        <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Analytics</span>
                    </button>
                    <button className="w-12 h-12 rounded-xl text-slate-400 flex items-center justify-center transition-all hover:bg-white/10 hover:text-white group relative">
                        <i className="fa-solid fa-inbox"></i>
                        <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Inbox</span>
                    </button>
                </nav>

                <div className="flex flex-col gap-4 px-3">
                    <button className="w-12 h-12 rounded-xl text-slate-400 flex items-center justify-center transition-all hover:bg-white/10 hover:text-white group relative">
                        <i className="fa-solid fa-gear"></i>
                        <span className="absolute left-14 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Settings</span>
                    </button>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-400 to-purple-500 border-2 border-slate-700 mt-2"></div>
                </div>
            </aside>

            {/* TIER 2: Secondary Navigation (Light Gray) */}
            <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col z-10">
                <div className="h-20 flex items-center px-6 border-b border-gray-100">
                    <h2 className="font-bold text-slate-800 text-lg">Configuration</h2>
                </div>

                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="p-4">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Knowledge Base</div>
                            <nav className="space-y-1">
                                {mainNavItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => onSwitchView(item.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${currentView === item.id
                                                ? 'bg-white text-brand-700 shadow-sm ring-1 ring-gray-200'
                                                : 'text-slate-600 hover:bg-gray-100 hover:text-slate-900'
                                            }`}
                                    >
                                        <i className={`${item.icon} w-5 text-center ${currentView === item.id ? 'text-brand-600' : 'text-slate-400'}`}></i>
                                        {item.label}
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-8">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">System</div>
                                <nav className="space-y-1">
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-100 hover:text-slate-900 transition-all">
                                        <i className="fa-solid fa-robot w-5 text-center text-slate-400"></i>
                                        Personality
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-100 hover:text-slate-900 transition-all">
                                        <i className="fa-solid fa-plug w-5 text-center text-slate-400"></i>
                                        Integrations
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-100 hover:text-slate-900 transition-all">
                                        <i className="fa-solid fa-file-invoice-dollar w-5 text-center text-slate-400"></i>
                                        Billing
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </ScrollArea>
                </div>
            </aside>
        </div>
    );
}
