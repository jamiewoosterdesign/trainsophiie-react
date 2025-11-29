// --- VIEW SWITCHING ---

function switchView(viewName) {
    currentView = viewName;

    // Update Views
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.getElementById(`view-${viewName}`).classList.add('active');

    // Update Sidebar Active
    document.querySelectorAll('.nav-icon-btn').forEach(el => el.classList.remove('active'));
    document.getElementById(`nav-${viewName}`).classList.add('active');

    // Update Submenu Highlights (Reset all first)
    const subServices = document.getElementById('sub-services');
    const subStaff = document.getElementById('sub-staff');
    const subProtocols = document.getElementById('sub-protocols');
    const subTransfers = document.getElementById('sub-transfers');

    if (subServices) subServices.className = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors";
    if (subStaff) subStaff.className = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors";
    if (subProtocols) subProtocols.className = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors";
    if (subTransfers) subTransfers.className = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-gray-50 hover:text-slate-900 transition-colors";

    const activeClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-brand-50 text-brand-700 font-medium";
    if (viewName === 'services' && subServices) subServices.className = activeClass;
    if (viewName === 'staff' && subStaff) subStaff.className = activeClass;
    if (viewName === 'protocols' && subProtocols) subProtocols.className = activeClass;
    if (viewName === 'transfers' && subTransfers) subTransfers.className = activeClass;
}

// --- GLOBAL SETTINGS ---
function openGlobalSettings() {
    const el = document.getElementById('globalSettingsModal');
    el.classList.remove('hidden');
    setTimeout(() => { el.classList.remove('opacity-0'); el.querySelector('div').classList.remove('scale-95'); }, 10);
}

function closeGlobalSettings() {
    const el = document.getElementById('globalSettingsModal');
    el.classList.add('opacity-0');
    el.querySelector('div').classList.add('scale-95');
    setTimeout(() => el.classList.add('hidden'), 300);
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Attach Listeners
    if (modalContent) {
        modalContent.addEventListener('input', () => hasUnsavedChanges = true);
        modalContent.addEventListener('change', () => hasUnsavedChanges = true);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) attemptClose();
        });
    }

    const newQuestionInput = document.getElementById('newQuestionInput');
    if (newQuestionInput) {
        newQuestionInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                addQuestion();
            }
        });
    }

    // Initialize default view
    switchView('services');
});
