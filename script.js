/* =================================================================
   1. GLOBAL VARIABLES
   ================================================================= */
let bootScreen, loadingBar, typingText, desktopElements;
let desktop, noBtn, yesBtn, audio, mainWindow;

const bootMessages = [
    "Loading System Files...",
    "Initializing Cuteness Drivers...",
    "Checking for Butterflies...",
    "Accessing Heart Partition...",
    "System Ready."
];
let msgIndex = 0;


/* =================================================================
   2. BOOT SEQUENCE (With Safety Net)
   ================================================================= */
function runBootSequence() {
    bootScreen = document.getElementById('boot-screen');
    loadingBar = document.getElementById('loadingBar');
    typingText = document.getElementById('typing-text');

    // Elements to show after boot
    desktopElements = [
        document.getElementById('desktop'),
        document.querySelector('.desktop-icons'),
        document.querySelector('.taskbar')
    ];

    // If we can't find the screen, just show the desktop immediately
    if (!bootScreen) return;

    let width = 0;
    const interval = setInterval(() => {
        // Increase width
        width += Math.random() * 20;
        if (width > 100) width = 100;

        // Update visual bar
        if (loadingBar) loadingBar.style.width = width + '%';

        // Update typing text
        if (typingText && Math.random() > 0.7 && msgIndex < bootMessages.length) {
            typingText.innerText = bootMessages[msgIndex];
            msgIndex++;
        }

        // Finished?
        if (width >= 100) {
            clearInterval(interval);
            finishBoot();
        }
    }, 150);
}

function finishBoot() {
    // Fade out boot screen
    if (bootScreen) {
        bootScreen.style.transition = "opacity 0.5s";
        bootScreen.style.opacity = "0";
    }

    // Show all desktop elements
    if (desktopElements) {
        desktopElements.forEach(el => {
            if (el) el.style.display = 'flex';
        });
    }

    // Remove boot screen from DOM
    setTimeout(() => {
        if (bootScreen) bootScreen.remove();
    }, 500);
}

/* =================================================================
   3. SAFETY NET (The Fix for "Stuck" Screens)
   ================================================================= */
// If the game hasn't started in 4 seconds, FORCE START IT.
setTimeout(() => {
    const bootCheck = document.getElementById('boot-screen');
    if (bootCheck && document.body.contains(bootCheck)) {
        console.warn("Boot sequence stuck! Forcing game start...");
        finishBoot();
    }
}, 4000);


/* =================================================================
   4. MAIN LOVE VIRUS LOGIC
   ================================================================= */
const errorMessages = [
    "Error: Heart.exe is missing.",
    "Warning: You look cute today.",
    "System Failure: Cannot accept 'No'.",
    "Critical Error: Love overflow.",
    "Unauthorized Access: Kiss required.",
    "Fatal Exception: You belong to me.",
    "404: Rejection Capability Missing."
];

function spawnError() {
    try {
        if (audio) {
            const soundClone = audio.cloneNode();
            soundClone.play().catch(() => {});
        }
    } catch(e) {}

    const win = document.createElement('div');
    win.className = 'window popup';

    // Smart Positioning
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const popupW = 220;
    const popupH = 100;

    const x = Math.random() * (screenW - popupW);
    const y = Math.random() * (screenH - popupH);

    win.style.left = `${Math.max(0, x)}px`;
    win.style.top = `${Math.max(0, y)}px`;

    const msg = errorMessages[Math.floor(Math.random() * errorMessages.length)];

    win.innerHTML = `
        <div class="title-bar">
            <div class="title-bar-text">Error</div>
            <div class="title-bar-controls">
                <button aria-label="Close" onclick="this.closest('.window').remove()"></button>
            </div>
        </div>
        <div class="window-body">
            <p style="text-align:center; font-size:12px">
                <img src="https://win98icons.alexmeub.com/icons/png/msg_error-0.png" style="vertical-align:middle"> 
                ${msg}
            </p>
            <div style="text-align:center; margin-top:10px">
                <button onclick="this.closest('.window').remove()">OK</button>
            </div>
        </div>
    `;

    if (desktop) desktop.appendChild(win);
}

// Variable to track if she tried to click yes before
let yesClickCount = 0;

// ==========================================
//  5. THE HAPPY ENDING LOGIC
// ==========================================

// The Love Letter to type out
const loveLetterText =
    "It looks like you're stuck with me forever.\n\n" +
    "You are the best glitch in my system.\n" +
    "Happy Valentine's Day, cutie. ❤️";

function acceptLove() {
    // 1. Check if she already clicked 'Yes' once (Reverse Psychology)
    // (Using a global variable 'yesClickCount' you should have at top of file)
    if (typeof yesClickCount === 'undefined') window.yesClickCount = 0;

    if (yesClickCount === 0) {
        setTimeout(() => {
            alert("Damn, I didn't expect you to give up so easily! 😲\n\nI challenge you: Try clicking 'No' first.");
        }, 10);
        yesClickCount++;
        return;
    }

    // 2. Show the BSOD Screen
    const bsod = document.getElementById('bsod');
    bsod.classList.remove('hidden');

    // 3. Start the Magic
    typeWriterEffect(loveLetterText, 'love-message');
    startFloatingHearts();
}

// Typewriter Effect Function
function typeWriterEffect(text, elementId) {
    const el = document.getElementById(elementId);
    el.innerHTML = ""; // Clear existing text
    let i = 0;

    function type() {
        if (i < text.length) {
            // Handle line breaks
            if (text.charAt(i) === '\n') {
                el.innerHTML += '<br>';
            } else {
                el.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(type, 50); // Speed of typing (50ms)
        } else {
            // Finished typing! Show the button
            document.getElementById('claim-btn').classList.remove('hidden');
        }
    }
    type();
}

function revealPrize() {
    document.getElementById('claim-btn').classList.add('hidden');
    document.getElementById('prize-reveal').classList.remove('hidden');

    // Trigger Confetti (if you still have the library loaded)
    // confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
}

function startFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 20 + 10 + "px"; // Random size
        heart.style.animationDuration = Math.random() * 3 + 2 + "s"; // Random speed

        container.appendChild(heart);

        // Remove heart after it floats up to save memory
        setTimeout(() => { heart.remove() }, 5000);
    }, 300); // Spawn a new heart every 300ms
}

/* =================================================================
   5. INITIALIZATION
   ================================================================= */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Variables
    desktop = document.getElementById('desktop');
    noBtn = document.getElementById('no-btn');
    yesBtn = document.getElementById('yes-btn');
    audio = document.getElementById('error-sound');
    mainWindow = document.getElementById('mainWindow');

    // 2. Run Boot
    runBootSequence();

    // 3. Setup Listeners
    if (noBtn) {
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
        }, { passive: false });

        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
        });

        noBtn.addEventListener('mouseover', spawnError);
    }

// ==========================================
    //  WINDOW CONTROLS (The Witty Lines)
    // ==========================================
    const minBtn = document.getElementById('minBtn');
    const maxBtn = document.getElementById('maxBtn');
    const closeBtn = document.getElementById('closeBtn');

    // 1. MINIMIZE BUTTON
    if (minBtn) minBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop click from hitting the window

        const minLines = [
            "Don't try to belittle me! 😤",
            "I'm already the perfect size.",
            "You can't hide from love.",
            "Minimize? I think not."
        ];
        // Pick a random line
        alert(minLines[Math.floor(Math.random() * minLines.length)]);

        // Run away logic (keep the chaos!)
        if (mainWindow) {
            const x = Math.random() * (window.innerWidth - 300);
            const y = Math.random() * (window.innerHeight - 200);
            mainWindow.style.transition = "all 0.2s";
            mainWindow.style.left = `${Math.max(0, x)}px`;
            mainWindow.style.top = `${Math.max(0, y)}px`;
        }
    });

    // 2. MAXIMIZE BUTTON
    if (maxBtn) maxBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const maxLines = [
            "Don't try to maximize me, it doesn't grow! 😳",
            "Size matters... but I'm trying my best.",
            "I'm already full screen in your heart.",
            "Error: Love overflow risk."
        ];
        alert(maxLines[Math.floor(Math.random() * maxLines.length)]);

        // Shake logic
        if (desktop) desktop.classList.add('shake-effect');
        setTimeout(() => { if (desktop) desktop.classList.remove('shake-effect'); }, 500);
    });

    // 3. CLOSE BUTTON
    if (closeBtn) closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const closeLines = [
            "You can't shut me down! 😡",
            "Nice try.",
            "There is no escape.",
            "Closing... Just kidding."
        ];
        alert(closeLines[Math.floor(Math.random() * closeLines.length)]);
    });
});

/* =================================================================
   6. CLOCK
   ================================================================= */
function updateClock() {
    const clockEl = document.getElementById('clock');
    if (!clockEl) return;
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    clockEl.innerText = `${hours}:${minutes} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

function openPhoto() {
    alert("Opening 'Us_Final.jpg'...\n\n(Actually, just click Yes on the main window!)");
}