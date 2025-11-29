import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { ServicesView } from './components/views/ServicesView';
import { StaffView } from './components/views/StaffView';
import { ProtocolsView } from './components/views/ProtocolsView';
import { TransfersView } from './components/views/TransfersView';
import { WizardModal } from './components/wizard/WizardModal';

function App() {
    const [currentView, setCurrentView] = useState('services');
    const [wizardState, setWizardState] = useState({ isOpen: false, mode: 'service' });

    const openWizard = (mode) => {
        setWizardState({ isOpen: true, mode });
    };

    const closeWizard = () => {
        setWizardState(prev => ({ ...prev, isOpen: false }));
    };

    const renderView = () => {
        switch (currentView) {
            case 'services': return <ServicesView onOpenWizard={openWizard} />;
            case 'staff': return <StaffView onOpenWizard={openWizard} onOpenGlobalSettings={() => { }} />;
            case 'protocols': return <ProtocolsView onOpenWizard={openWizard} />;
            case 'transfers': return <TransfersView onOpenWizard={openWizard} onOpenGlobalSettings={() => { }} />;
            default: return <ServicesView onOpenWizard={openWizard} />;
        }
    };

    return (
        <div className="bg-gray-100 h-screen flex overflow-hidden text-slate-800 font-sans">
            <Sidebar currentView={currentView} onSwitchView={setCurrentView} />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-white">
                {renderView()}
            </main>

            <WizardModal
                isOpen={wizardState.isOpen}
                onClose={closeWizard}
                initialMode={wizardState.mode}
            />
        </div>
    );
}

export default App;
