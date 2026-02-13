/* =================================================================
   1. GLOBAL VARIABLES
   ================================================================= */
let bootScreen, loadingBar, typingText, desktopElements;
let desktop, noBtn, yesBtn, audio, mainWindow;
let yesClickCount = 0;

const bootMessages = [
    "Loading System Files...",
    "Initializing Cuteness Drivers...",
    "Checking for Butterflies...",
    "Accessing Heart Partition...",
    "System Ready."
];
let msgIndex = 0;

const loveLetterText =
    "Status: System Repaired.\n" +
    "User: Parineeta authorized for life.\n\n" +
    "You are the best glitch in my system.\n" +
    "Happy Valentine's Day, cutie. ❤️";

/* =================================================================
   2. BOOT SEQUENCE
   ================================================================= */
function runBootSequence() {
    bootScreen = document.getElementById('boot-screen');
    loadingBar = document.getElementById('loadingBar');
    typingText = document.getElementById('typing-text');
    desktopElements = [
        document.getElementById('desktop'),
        document.querySelector('.desktop-icons'),
        document.querySelector('.taskbar')
    ];

    if (!bootScreen) return;

    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 20;
        if (width > 100) width = 100;
        if (loadingBar) loadingBar.style.width = width + '%';
        if (typingText && Math.random() > 0.7 && msgIndex < bootMessages.length) {
            typingText.innerText = bootMessages[msgIndex];
            msgIndex++;
        }
        if (width >= 100) {
            clearInterval(interval);
            finishBoot();
        }
    }, 150);
}

function finishBoot() {
    if (bootScreen) {
        bootScreen.style.transition = "opacity 0.5s";
        bootScreen.style.opacity = "0";
    }
    if (desktopElements) {
        desktopElements.forEach(el => { if (el) el.style.display = 'flex'; });
    }
    setTimeout(() => { if (bootScreen) bootScreen.remove(); }, 500);
}

/* =================================================================
   3. THE CHAOS LOGIC (NO SHAKE)
   ================================================================= */
function spawnError() {
    try {
        if (audio) { audio.cloneNode().play().catch(() => {}); }
    } catch(e) {}

    const win = document.createElement('div');
    win.className = 'window popup';
    const x = Math.random() * (window.innerWidth - 220);
    const y = Math.random() * (window.innerHeight - 100);
    win.style.left = `${Math.max(0, x)}px`;
    win.style.top = `${Math.max(0, y)}px`;

    const errorMessages = [
        "Error: Heart.exe is missing.",
        "Warning: You look cute today.",
        "System Failure: Cannot accept 'No'.",
        "Critical Error: Hate overflow.",
        "Unauthorized Access: Kiss required."
    ];
    const msg = errorMessages[Math.floor(Math.random() * errorMessages.length)];

    win.innerHTML = `
        <div class="title-bar"><div class="title-bar-text">Error</div></div>
        <div class="window-body">
            <p style="font-size:12px"><img src="https://win98icons.alexmeub.com/icons/png/msg_error-0.png" style="vertical-align:middle"> ${msg}</p>
            <div style="text-align:center; margin-top:10px"><button onclick="this.closest('.window').remove()">OK</button></div>
        </div>
    `;

    if (desktop) {
        desktop.appendChild(win);
        // Shake logic has been completely removed from here
    }
}

function acceptLove() {
    if (yesClickCount === 0) {
        setTimeout(() => {
            alert("Arey, itni jaldi 'Yes'?! 🛑\n\n Didn't take you for a quitter babe!");
        }, 10);
        yesClickCount++;
    } else {
        const overlay = document.getElementById('repair-overlay');
        const bar = document.getElementById('repairBar');
        overlay.classList.remove('hidden');

        let width = 0;
        const repairInt = setInterval(() => {
            width += 5;
            bar.style.width = width + "%";
            if (width >= 100) {
                clearInterval(repairInt);
                overlay.classList.add('hidden');
                document.getElementById('bsod').classList.remove('hidden');
                typeWriterEffect(loveLetterText, "love-message");
                startFloatingHearts();
            }
        }, 50);
    }
}

function typeWriterEffect(text, elementId) {
    const el = document.getElementById(elementId);
    el.innerHTML = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            el.innerHTML += (text.charAt(i) === '\n') ? '<br>' : text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            document.getElementById('claim-btn').classList.remove('hidden');
        }
    }
    type();
}

function startFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 20 + 10 + "px";
        heart.style.animationDuration = Math.random() * 3 + 2 + "s";
        container.appendChild(heart);
        setTimeout(() => { heart.remove() }, 5000);
    }, 300);
}

/* =================================================================
   4. INITIALIZATION (Optimized for iPhone)
   ================================================================= */
document.addEventListener('DOMContentLoaded', () => {
    desktop = document.getElementById('desktop');
    noBtn = document.getElementById('no-btn');
    yesBtn = document.getElementById('yes-btn');
    audio = document.getElementById('error-sound');
    mainWindow = document.getElementById('mainWindow');

    runBootSequence();

    // IPHONE & DESKTOP FIX: Unified handler for instant response
    if (noBtn) {
        const handleNo = (e) => {
            e.preventDefault();
            e.stopPropagation();
            spawnError();
        };

        // Attach both for maximum compatibility
        noBtn.addEventListener('touchstart', handleNo, { passive: false });
        noBtn.addEventListener('click', handleNo);
    }

    // Window Controls
    document.getElementById('minBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        alert("Don't try to belittle me! 😤");
    });

    document.getElementById('maxBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        alert("I'm already 6'1, don't maximise 😳");
    });

    document.getElementById('closeBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        alert("Picture abhi baaki hai! 😡");
        spawnError();
    });

    // Clock
    setInterval(() => {
        const now = new Date();
        const clockEl = document.getElementById('clock');
        if (clockEl) clockEl.innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }, 1000);
});

function revealPrize() {
    document.getElementById('claim-btn').classList.add('hidden');
    document.getElementById('prize-reveal').classList.remove('hidden');
}

function openPhoto() { alert("Opening 'Us_Final.jpg'... Click 'Yes' for the real deal!"); }