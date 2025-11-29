// --- Live Simulator Logic ---
let hasShownUserIntent = false;
let hasShownBotAck = false;

function updatePreview(mode) {
    if (mode === 'service') updateServicePreview();
    else if (mode === 'staff') updateStaffPreview();
    else if (mode === 'protocol') updateProtocolPreview();
    else if (mode === 'transfer') updateTransferPreview();
}

function updateServicePreview() {
    const nameInput = document.getElementById('serviceNameInput');
    const descInput = document.getElementById('serviceDescInput');

    if (!nameInput || !descInput) return;

    const serviceName = nameInput.value;
    const desc = descInput.value;

    // Safety check for outcome radio
    const outcomeEl = document.querySelector('input[name="outcome"]:checked');
    const outcome = outcomeEl ? outcomeEl.value : 'transfer';

    const transferConfig = document.getElementById('transferConfig');
    const bookConfig = document.getElementById('bookConfig');
    const infoConfig = document.getElementById('infoConfig');

    if (transferConfig) transferConfig.style.display = outcome === 'transfer' ? 'block' : 'none';
    if (bookConfig) bookConfig.style.display = outcome === 'book' ? 'block' : 'none';
    if (infoConfig) infoConfig.style.display = outcome === 'info' ? 'block' : 'none';

    if (serviceName.length > 3 && !hasShownUserIntent) {
        addBubble('user', `I'm looking for help with <b>${serviceName}</b>.`);
        hasShownUserIntent = true;
        setTimeout(() => { addSystemMsg('Sophiie recognized intent: ' + serviceName); }, 600);
    }

    if (desc.length > 5 && !hasShownBotAck && hasShownUserIntent) {
        setTimeout(() => {
            addBubble('bot', `I can definitely help with that. We handle ${serviceName} specifically by ${desc.substring(0, 20)}...`);
            hasShownBotAck = true;
        }, 800);
    }

    if (currentStep === 3) {
        const existingOutcome = document.getElementById('outcomeBubble');
        if (existingOutcome) existingOutcome.remove();

        let icon = ''; let text = '';
        if (outcome === 'transfer') { icon = 'fa-phone-arrow-up-right'; text = 'Transferring call to team...'; }
        else if (outcome === 'book') { icon = 'fa-calendar-days'; text = 'Checking calendar availability...'; }
        else if (outcome === 'info') {
            const sendSMS = document.getElementById('checkSMS').checked;
            const sendEmail = document.getElementById('checkEmail').checked;
            if (sendSMS && sendEmail) { icon = 'fa-envelopes-bulk'; text = 'Sending details via SMS & Email...'; }
            else if (sendSMS) { icon = 'fa-comment-sms'; text = 'Sending details via SMS...'; }
            else if (sendEmail) { icon = 'fa-envelope'; text = 'Sending details via Email...'; }
            else { icon = 'fa-circle-question'; text = 'Select a delivery method...'; }
        }
        const bubbleHtml = `<div id="outcomeBubble" class="system-bubble text-brand-600 bg-brand-50 py-2 px-3 rounded-lg border border-brand-100 animate-fade-in mt-4"><i class="fa-solid ${icon}"></i> Action: ${text}</div>`;
        chatContainer.insertAdjacentHTML('beforeend', bubbleHtml);
        scrollToBottom();
    }
}

function updateStaffPreview() {
    const name = document.getElementById('staffNameInput').value || 'Sarah';
    const role = document.getElementById('staffRoleInput').value || 'Manager';
    const resp = document.getElementById('staffRespInput').value || 'billing';

    if (document.getElementById('sim-staff-1')) return;

    if (currentStep === 2 && resp.length > 5) {
        addBubble('user', `I have a tricky question about my ${resp.split(' ')[0]}.`);
        setTimeout(() => {
            addSystemMsg(`Intent recognized: Matches ${name}'s responsibilities.`);
            setTimeout(() => {
                addBubble('bot', `I can help with that. Let me get you to ${name}, our ${role}, who handles that best.`);
            }, 600);
        }, 500);
        const flag = document.createElement('div'); flag.id = 'sim-staff-1'; chatContainer.appendChild(flag);
    }

    if (currentStep === 3) {
        const existingOutcome = document.getElementById('outcomeBubbleStaff');
        if (existingOutcome) existingOutcome.remove();
        const bubbleHtml = `<div id="outcomeBubbleStaff" class="system-bubble text-brand-600 bg-brand-50 py-2 px-3 rounded-lg border border-brand-100 animate-fade-in mt-4"><i class="fa-solid fa-phone-arrow-up-right"></i> Rule: Transfer to ${name}</div>`;
        chatContainer.insertAdjacentHTML('beforeend', bubbleHtml);
        scrollToBottom();
    }
}

function updateProtocolPreview() {
    if (currentStep === 1) {
        // Just text change in Step 1, wait for Step 2 interaction
    } else if (currentStep === 2) {
        const action = document.getElementById('protocolActionSelect').value;
        const existingOutcome = document.getElementById('outcomeBubbleProtocol');
        if (existingOutcome) existingOutcome.remove();

        let text = "Action pending...";
        if (action === 'script') text = "Reading Script: We do not offer refunds...";
        if (action === 'transfer') text = "Action: Transfer to selected team";
        if (action === 'refuse') text = "Action: Politely decline request";
        if (action === 'collect') text = "Action: Collect details and save note";

        const bubbleHtml = `<div id="outcomeBubbleProtocol" class="system-bubble text-indigo-600 bg-indigo-50 py-2 px-3 rounded-lg border border-indigo-100 animate-fade-in mt-4"><i class="fa-solid fa-bolt"></i> Protocol: ${text}</div>`;
        chatContainer.insertAdjacentHTML('beforeend', bubbleHtml);
        scrollToBottom();
    }
}

function updateTransferPreview() {
    if (currentStep === 2) {
        const summary = document.getElementById('transferSummaryInput').value;
        // Show AI whispering to agent logic
        const existingOutcome = document.getElementById('outcomeBubbleTransfer');
        if (existingOutcome) existingOutcome.remove();

        // Parse mock variables for display
        let displaySummary = summary.replace('{Caller Name}', 'John').replace('{Reason}', 'a leaky tap').replace('{Key Details}', 'it is flooding the kitchen');

        const bubbleHtml = `<div id="outcomeBubbleTransfer" class="system-bubble text-orange-600 bg-orange-50 py-2 px-3 rounded-lg border border-orange-100 animate-fade-in mt-4 text-left"><div class="flex items-center gap-2 mb-1"><i class="fa-solid fa-user-headset"></i> <span class="font-bold text-xs uppercase">AI to Agent Whisper</span></div>"${displaySummary}"</div>`;
        chatContainer.insertAdjacentHTML('beforeend', bubbleHtml);
        scrollToBottom();
    }
}

function addBubble(type, html) {
    let bubbleHtml = '';
    if (type === 'user') bubbleHtml = `<div class="user-bubble chat-bubble">${html}</div>`;
    else bubbleHtml = `<div class="flex gap-3 animate-fade-in"><div class="w-8 h-8 rounded-full bg-brand-600 flex-shrink-0 flex items-center justify-center text-white text-xs"><i class="fa-solid fa-headset"></i></div><div class="bot-bubble chat-bubble">${html}</div></div>`;
    chatContainer.insertAdjacentHTML('beforeend', bubbleHtml);
    scrollToBottom();
}

function addSystemMsg(text) {
    const html = `<div class="system-bubble"><i class="fa-solid fa-bolt text-yellow-500"></i> ${text}</div>`;
    chatContainer.insertAdjacentHTML('beforeend', html);
    scrollToBottom();
}

function scrollToBottom() {
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
}

function resetPreview() {
    if (!chatContainer) return;
    chatContainer.innerHTML = `<div class="system-bubble"><i class="fa-solid fa-play"></i> Simulation Started</div><div class="flex gap-3"><div class="w-8 h-8 rounded-full bg-brand-600 flex-shrink-0 flex items-center justify-center text-white text-xs"><i class="fa-solid fa-headset"></i></div><div class="bot-bubble chat-bubble">Hi, thanks for calling ABC Plumbing. How can I help you today?</div></div>`;
    hasShownUserIntent = false;
    hasShownBotAck = false;
}
