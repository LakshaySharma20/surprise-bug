const noBtn = document.getElementById('no-btn');
const desktop = document.getElementById('desktop');
const errorSound = document.getElementById('error-sound');

// Funny messages for the popups
const errorMessages = [
    "Error: Heart.exe is missing.",
    "Warning: You look cute today.",
    "System Failure: Cannot accept 'No'.",
    "Critical Error: Love overflow.",
    "Unauthorized Access: Kiss required.",
    "Fatal Exception: You belong to me.",
    "404: Other boyfriends not found."
];

function spawnError() {
    // 1. Play Sound (if available)
    try {
        errorSound.currentTime = 0;
        errorSound.play();
    } catch(e) { /* Ignore audio errors */ }

    // 2. Create the popup HTML
    const win = document.createElement('div');
    win.className = 'window popup';

    // 3. Random Position
    // We subtract 250 (width) so it doesn't spawn off-screen
    const x = Math.floor(Math.random() * (window.innerWidth - 250));
    const y = Math.floor(Math.random() * (window.innerHeight - 200));

    win.style.left = `${x}px`;
    win.style.top = `${y}px`;

    const msg = errorMessages[Math.floor(Math.random() * errorMessages.length)];

    win.innerHTML = `
        <div class="title-bar">
            <div class="title-bar-text">Error</div>
            <div class="title-bar-controls">
                <button aria-label="Close" onclick="this.closest('.window').remove()"></button>
            </div>
        </div>
        <div class="window-body">
            <p style="text-align:center"><img src="https://win98icons.alexmeub.com/icons/png/msg_error-0.png"> ${msg}</p>
            <div style="text-align:center; margin-top:10px">
                <button onclick="this.closest('.window').remove()">OK</button>
            </div>
        </div>
    `;

    desktop.appendChild(win);
}

// Event Listeners
noBtn.addEventListener('mouseover', spawnError);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Spawn 5 errors at once if clicked
    for(let i=0; i<5; i++) spawnError();
});

// The Happy Ending
function acceptLove() {
    document.getElementById('bsod').classList.remove('hidden');
    // Optional: Go full screen for effect
    document.documentElement.requestFullscreen().catch(e => {});
}

// Helper function to shake the screen
function triggerChaos() {
    // 1. Play Sound
    audio.play().catch(e => console.log("Audio needs user interaction first"));

    // 2. Spawn Error Windows
    spawnError();
    spawnError(); // Spawn double for extra chaos

    // 3. Shake the Screen (Visual Vibration)
    desktop.classList.add('shake-effect');

    // Remove the class after 500ms so it can shake again
    setTimeout(() => {
        desktop.classList.remove('shake-effect');
    }, 500);
}

// ==========================================
//  IOS & MOBILE EVENT LISTENERS
// ==========================================

// Handle Touch (iPhone)
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Stop the button from actually being clicked
    triggerChaos();
}, { passive: false });

// Handle Mouse (Desktop testing)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    triggerChaos();
});