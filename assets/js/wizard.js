// --- WIZARD LOGIC ---

function openWizard(mode) {
    wizardMode = mode || 'service';
    isNestedStaffFlow = false;

    configureWizardUI(wizardMode);

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
    resetWizard();
}

function switchToStaffFlow() {
    isNestedStaffFlow = true;
    wizardMode = 'staff';
    document.getElementById('customSelectMenu').classList.add('hidden');
    configureWizardUI('staff');
    document.getElementById('staffNameInput').value = '';
    document.getElementById('staffRoleInput').value = '';

    currentStep = 1;
    document.querySelectorAll('.wizard-step').forEach(el => el.classList.remove('active'));
    document.getElementById('staff-step-1').classList.add('active');
    updateStepperUI();
}

function returnToServiceFlow() {
    wizardMode = 'service';
    isNestedStaffFlow = false;
    configureWizardUI('service');

    currentStep = 3;
    document.querySelectorAll('.wizard-step').forEach(el => el.classList.remove('active'));
    document.getElementById('service-step-3').classList.add('active');
    updateStepperUI();
    document.getElementById('selectedValue').innerText = "New Team Member";
}

function configureWizardUI(mode) {
    // Hide all first
    document.getElementById('serviceFormContainer').classList.add('hidden');
    document.getElementById('staffFormContainer').classList.add('hidden');
    document.getElementById('protocolFormContainer').classList.add('hidden');
    document.getElementById('transferFormContainer').classList.add('hidden');
    document.getElementById('nestedStaffAlert').classList.add('hidden');

    if (mode === 'service') {
        document.getElementById('serviceFormContainer').classList.remove('hidden');
        document.getElementById('wizardTitle').innerText = 'Add New Service';
        document.getElementById('step-label-1').innerText = 'Basics';
        document.getElementById('step-label-2').innerText = 'Knowledge';
        document.getElementById('step-label-3').innerText = 'Outcome';
    } else if (mode === 'staff') {
        document.getElementById('staffFormContainer').classList.remove('hidden');
        document.getElementById('wizardTitle').innerText = 'Add Team Member';
        document.getElementById('step-label-1').innerText = 'Profile';
        document.getElementById('step-label-2').innerText = 'Responsibilities';
        document.getElementById('step-label-3').innerText = 'Transfer Rules';
        if (isNestedStaffFlow) document.getElementById('nestedStaffAlert').classList.remove('hidden');
    } else if (mode === 'protocol') {
        document.getElementById('protocolFormContainer').classList.remove('hidden');
        document.getElementById('wizardTitle').innerText = 'Add New Protocol';
        document.getElementById('step-label-1').innerText = 'Trigger';
        document.getElementById('step-label-2').innerText = 'Action';
        document.getElementById('step-label-3').innerText = 'Review';
    } else if (mode === 'transfer') {
        document.getElementById('transferFormContainer').classList.remove('hidden');
        document.getElementById('wizardTitle').innerText = 'Add Transfer Rule';
        document.getElementById('step-label-1').innerText = 'Strategy';
        document.getElementById('step-label-2').innerText = 'Handoff';
        document.getElementById('step-label-3').innerText = 'Routing';
    }
}

function attemptClose() {
    if (hasUnsavedChanges) toggleSaveModal(true);
    else closeWizard();
}

function closeWizard() {
    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

function toggleSaveModal(show) {
    const el = document.getElementById('saveConfirmModal');
    show ? el.classList.remove('hidden') : el.classList.add('hidden');
}

function saveAndClose() {
    toggleSaveModal(false);
    if (isNestedStaffFlow) returnToServiceFlow();
    else closeWizard();
}

function discardAndClose() {
    toggleSaveModal(false);
    if (isNestedStaffFlow) returnToServiceFlow();
    else closeWizard();
}

function updatePriceInput() {
    const priceInput = document.getElementById('priceInput');
    const priceInputContainer = document.getElementById('priceInputContainer');
    const mode = document.querySelector('input[name="priceMode"]:checked').value;

    priceInput.disabled = false;
    priceInputContainer.style.opacity = '1';
    if (mode === 'fixed') priceInput.placeholder = 'Enter fixed price amount...';
    else if (mode === 'hourly') priceInput.placeholder = 'Enter hourly rate...';
    else if (mode === 'range') { priceInput.placeholder = 'Enter min - max...'; priceInput.type = "text"; }
    else if (mode === 'na') { priceInput.placeholder = 'Price not applicable'; priceInput.disabled = true; priceInputContainer.style.opacity = '0.5'; priceInput.value = ''; }
    if (mode !== 'range') priceInput.type = "number";
}

function nextStep() {
    if (currentStep < totalSteps) {
        const currentStepId = `${wizardMode}-step-${currentStep}`;
        const nextStepId = `${wizardMode}-step-${currentStep + 1}`;
        document.getElementById(currentStepId).classList.remove('active');
        currentStep++;
        document.getElementById(nextStepId).classList.add('active');
        updateStepperUI();
    } else {
        if (isNestedStaffFlow) returnToServiceFlow();
        else saveAndClose();
    }
}

function prevStep() {
    if (currentStep > 1) {
        const currentStepId = `${wizardMode}-step-${currentStep}`;
        const prevStepId = `${wizardMode}-step-${currentStep - 1}`;
        document.getElementById(currentStepId).classList.remove('active');
        currentStep--;
        document.getElementById(prevStepId).classList.add('active');
        updateStepperUI();
    } else {
        if (isNestedStaffFlow) returnToServiceFlow();
    }
}

function updateStepperUI() {
    for (let i = 1; i <= totalSteps; i++) {
        const dot = document.getElementById(`step-dot-${i}`);
        const label = document.getElementById(`step-label-${i}`);
        if (i <= currentStep) {
            dot.classList.remove('bg-gray-300');
            dot.classList.add('bg-brand-600');
            label.classList.remove('text-gray-400');
            label.classList.add('text-brand-600');
        } else {
            dot.classList.add('bg-gray-300');
            dot.classList.remove('bg-brand-600');
            label.classList.add('text-gray-400');
            label.classList.remove('text-brand-600');
        }
    }
    document.getElementById('backBtn').disabled = (currentStep === 1 && !isNestedStaffFlow);

    if (currentStep === totalSteps) {
        document.getElementById('nextBtn').innerText = isNestedStaffFlow ? 'Create & Return' : 'Save & Close';
    } else {
        document.getElementById('nextBtn').innerText = 'Next Step';
    }
    updatePreview(wizardMode);
}

function resetWizard() {
    currentStep = 1;
    hasUnsavedChanges = false;
    document.querySelectorAll('.wizard-step').forEach(el => el.classList.remove('active'));
    document.getElementById(`${wizardMode}-step-1`).classList.add('active');
    updateStepperUI();

    const nameInput = document.getElementById('serviceNameInput');
    const descInput = document.getElementById('serviceDescInput');
    if (nameInput) nameInput.value = '';
    if (descInput) descInput.value = '';

    const fixedRadio = document.querySelector('input[value="fixed"]');
    if (fixedRadio) {
        fixedRadio.checked = true;
        updatePriceInput();
    }

    const staffName = document.getElementById('staffNameInput');
    const staffRole = document.getElementById('staffRoleInput');
    const staffResp = document.getElementById('staffRespInput');
    const transferName = document.getElementById('transferNameInput');

    if (staffName) staffName.value = '';
    if (staffRole) staffRole.value = '';
    if (staffResp) staffResp.value = '';
    if (transferName) transferName.value = '';

    resetPreview();
}

// Protocol Trigger Logic
function updateProtocolPlaceholder() {
    const type = document.querySelector('input[name="protocolTrigger"]:checked').value;
    const input = document.getElementById('protocolTriggerInput');
    if (type === 'keyword') {
        input.placeholder = "Enter specific keywords (comma separated)...";
    } else {
        input.placeholder = "Describe the user's goal (e.g., 'The user is angry about a bill')...";
    }
}

// Add Question Logic
function addQuestion() {
    const newQuestionInput = document.getElementById('newQuestionInput');
    const questionsList = document.getElementById('questionsList');

    const txt = newQuestionInput.value;
    if (!txt) return;
    hasUnsavedChanges = true;
    const div = document.createElement('div');
    div.className = 'flex gap-2 animate-fade-in';
    div.innerHTML = `<div class="flex-1 bg-gray-50 px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-slate-700 flex items-center justify-between group"><span>${txt}</span><button onclick="this.parentElement.parentElement.remove(); hasUnsavedChanges=true;" class="text-gray-400 hover:text-red-500"><i class="fa-solid fa-trash"></i></button></div>`;
    questionsList.appendChild(div);
    newQuestionInput.value = '';
}
