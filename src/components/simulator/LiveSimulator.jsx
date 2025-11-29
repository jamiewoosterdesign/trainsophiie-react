import React, { useState, useEffect, useRef } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

export function LiveSimulator({ mode, step, data }) {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // State trackers to prevent duplicate messages
    const stateRef = useRef({
        hasShownUserIntent: false,
        hasShownBotAck: false,
        lastOutcome: null
    });

    // Reset simulation when mode changes or explicitly requested
    useEffect(() => {
        resetSimulation();
    }, [mode]);

    const resetSimulation = () => {
        setMessages([
            { type: 'system', content: 'Simulation Started', icon: 'fa-play' },
            { type: 'bot', content: 'Hi, thanks for calling ABC Plumbing. How can I help you today?' }
        ]);
        stateRef.current = { hasShownUserIntent: false, hasShownBotAck: false, lastOutcome: null };
    };

    const addMessage = (msg) => {
        setMessages(prev => [...prev, msg]);
    };

    // Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            // Access the viewport element of ScrollArea to scroll
            const viewport = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, [messages]);

    // SERVICE PREVIEW LOGIC
    useEffect(() => {
        if (mode !== 'service') return;

        const { serviceName, serviceDesc, outcome, deliveryMethods } = data;

        // User Intent
        if (serviceName?.length > 3 && !stateRef.current.hasShownUserIntent) {
            addMessage({ type: 'user', content: `I'm looking for help with <b>${serviceName}</b>.` });
            stateRef.current.hasShownUserIntent = true;
            setTimeout(() => {
                addMessage({ type: 'system', content: `Sophiie recognized intent: ${serviceName}`, icon: 'fa-bolt', color: 'text-yellow-500' });
            }, 600);
        }

        // Bot Acknowledgement
        if (serviceDesc?.length > 5 && !stateRef.current.hasShownBotAck && stateRef.current.hasShownUserIntent) {
            setTimeout(() => {
                addMessage({ type: 'bot', content: `I can definitely help with that. We handle ${serviceName} specifically by ${serviceDesc.substring(0, 20)}...` });
                stateRef.current.hasShownBotAck = true;
            }, 800);
        }

        // Outcome (Step 3)
        if (step === 3) {
            let icon = '';
            let text = '';
            let colorClass = 'text-brand-600 bg-brand-50 border-brand-100';

            if (outcome === 'transfer') { icon = 'fa-phone-arrow-up-right'; text = 'Transferring call to team...'; }
            else if (outcome === 'book') { icon = 'fa-calendar-days'; text = 'Checking calendar availability...'; }
            else if (outcome === 'info') {
                const { sms, email } = deliveryMethods || {};
                if (sms && email) { icon = 'fa-envelopes-bulk'; text = 'Sending details via SMS & Email...'; }
                else if (sms) { icon = 'fa-comment-sms'; text = 'Sending details via SMS...'; }
                else if (email) { icon = 'fa-envelope'; text = 'Sending details via Email...'; }
                else { icon = 'fa-circle-question'; text = 'Select a delivery method...'; }
            }

            setMessages(prev => {
                const filtered = prev.filter(m => m.type !== 'outcome');
                return [...filtered, { type: 'outcome', content: `Action: ${text}`, icon, colorClass }];
            });
        }
    }, [mode, step, data]);

    // STAFF PREVIEW LOGIC
    useEffect(() => {
        if (mode !== 'staff') return;
        const { firstName, role, responsibilities } = data;
        const name = firstName || 'Sarah';
        const roleTitle = role || 'Manager';

        if (step === 2 && responsibilities?.length > 5 && !stateRef.current.hasShownUserIntent) {
            addMessage({ type: 'user', content: `I have a tricky question about my ${responsibilities.split(' ')[0]}.` });
            stateRef.current.hasShownUserIntent = true;
            setTimeout(() => {
                addMessage({ type: 'system', content: `Intent recognized: Matches ${name}'s responsibilities.`, icon: 'fa-bolt', color: 'text-yellow-500' });
                setTimeout(() => {
                    addMessage({ type: 'bot', content: `I can help with that. Let me get you to ${name}, our ${roleTitle}, who handles that best.` });
                }, 600);
            }, 500);
        }

        if (step === 3) {
            setMessages(prev => {
                const filtered = prev.filter(m => m.type !== 'outcome');
                return [...filtered, {
                    type: 'outcome',
                    content: `Rule: Transfer to ${name}`,
                    icon: 'fa-phone-arrow-up-right',
                    colorClass: 'text-brand-600 bg-brand-50 border-brand-100'
                }];
            });
        }
    }, [mode, step, data]);

    // PROTOCOL PREVIEW LOGIC
    useEffect(() => {
        if (mode !== 'protocol') return;

        if (step === 2) {
            const { action } = data;
            let text = "Action pending...";
            if (action === 'script') text = "Reading Script: We do not offer refunds...";
            if (action === 'transfer') text = "Action: Transfer to selected team";
            if (action === 'refuse') text = "Action: Politely decline request";
            if (action === 'collect') text = "Action: Collect details and save note";

            setMessages(prev => {
                const filtered = prev.filter(m => m.type !== 'outcome');
                return [...filtered, {
                    type: 'outcome',
                    content: `Protocol: ${text}`,
                    icon: 'fa-bolt',
                    colorClass: 'text-indigo-600 bg-indigo-50 border-indigo-100'
                }];
            });
        }
    }, [mode, step, data]);

    // TRANSFER PREVIEW LOGIC
    useEffect(() => {
        if (mode !== 'transfer') return;

        if (step === 2) {
            const { summary } = data;
            if (summary) {
                let displaySummary = summary
                    .replace('{Caller Name}', 'John')
                    .replace('{Reason}', 'a leaky tap')
                    .replace('{Key Details}', 'it is flooding the kitchen');

                setMessages(prev => {
                    const filtered = prev.filter(m => m.type !== 'outcome');
                    return [...filtered, {
                        type: 'outcome',
                        content: `"${displaySummary}"`,
                        icon: 'fa-user-headset',
                        title: 'AI to Agent Whisper',
                        colorClass: 'text-orange-600 bg-orange-50 border-orange-100',
                        isWhisper: true
                    }];
                });
            }
        }
    }, [mode, step, data]);


    return (
        <div className="w-2/5 bg-slate-50 flex flex-col relative border-l border-gray-200 h-full">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-200 to-transparent opacity-50"></div>

            {/* Simulator Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Live Simulation</span>
                </div>
                <button onClick={resetSimulation} className="text-xs text-brand-600 hover:text-brand-800 font-medium">
                    <i className="fa-solid fa-rotate-right mr-1"></i> Reset
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-hidden" ref={scrollRef}>
                <ScrollArea className="h-full p-6">
                    <div className="space-y-4 pb-4">
                        {messages.map((msg, idx) => (
                            <React.Fragment key={idx}>
                                {msg.type === 'user' && (
                                    <div className="user-bubble chat-bubble" dangerouslySetInnerHTML={{ __html: msg.content }}></div>
                                )}
                                {msg.type === 'bot' && (
                                    <div className="flex gap-3 animate-fade-in">
                                        <div className="w-8 h-8 rounded-full bg-brand-600 flex-shrink-0 flex items-center justify-center text-white text-xs">
                                            <i className="fa-solid fa-headset"></i>
                                        </div>
                                        <div className="bot-bubble chat-bubble" dangerouslySetInnerHTML={{ __html: msg.content }}></div>
                                    </div>
                                )}
                                {msg.type === 'system' && (
                                    <div className="system-bubble">
                                        <i className={`fa-solid ${msg.icon || 'fa-bolt'} ${msg.color || 'text-gray-400'}`}></i> {msg.content}
                                    </div>
                                )}
                                {msg.type === 'outcome' && (
                                    <div className={`system-bubble ${msg.colorClass} py-2 px-3 rounded-lg border animate-fade-in mt-4 ${msg.isWhisper ? 'text-left block' : ''}`}>
                                        {msg.isWhisper ? (
                                            <>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <i className={`fa-solid ${msg.icon}`}></i>
                                                    <span className="font-bold text-xs uppercase">{msg.title}</span>
                                                </div>
                                                {msg.content}
                                            </>
                                        ) : (
                                            <>
                                                <i className={`fa-solid ${msg.icon}`}></i> {msg.content}
                                            </>
                                        )}
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Input Placeholder */}
            <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                    <div className="h-10 bg-gray-100 rounded-full flex-1 border border-transparent flex items-center px-4 text-gray-400 text-sm italic">
                        Customer is speaking...
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-500 flex items-center justify-center">
                        <i className="fa-solid fa-microphone"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}
