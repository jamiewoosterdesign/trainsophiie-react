// State Management
let currentStep = 1;
const totalSteps = 3;
let hasUnsavedChanges = false;
let wizardMode = 'service'; // 'service', 'staff', 'protocol', 'transfer'
let isNestedStaffFlow = false;
let currentView = 'services';

// DOM Elements (Shared)
const modal = document.getElementById('wizardModal');
const modalContent = document.getElementById('wizardContent');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const chatContainer = document.getElementById('chatContainer');

// --- CUSTOM DROPDOWN LOGIC ---
function toggleDropdown() {
    document.getElementById('customSelectMenu').classList.toggle('hidden');
}

function selectOption(value) {
    document.getElementById('selectedValue').innerText = value;
    toggleDropdown();
}

function filterOptions(input) {
    const filter = input.value.toUpperCase();
    const div = document.getElementById("dropdownOptions");
    const options = div.getElementsByClassName("option-item");
    for (let i = 0; i < options.length; i++) {
        const txtValue = options[i].textContent || options[i].innerText;
        options[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
    }
}

// Export for use in other files if we were using modules, 
// but for simple script tags, these are global.
