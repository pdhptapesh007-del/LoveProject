
const screens = {
    intro: document.querySelector("#intro"),
    letter: document.querySelector("#letter"),
    question: document.querySelector("#question"),
    gift: document.querySelector("#gift"),
    final: document.querySelector("#final"),
    surprise: document.querySelector("#surprise"),
    storyEnd: document.querySelector("#storyEnd")
};

const continueBtn = document.querySelector("#continueBtn");
const yesBtn = document.querySelector("#yesBtn");
const noBtn = document.querySelector("#noBtn");
const continueStoryBtn = document.querySelector("#continueStoryBtn");
const openSurpriseBtn = document.querySelector("#openSurpriseBtn");
const foundBtn = document.querySelector("#foundBtn");
const noMessage = document.querySelector("#noMessage");

if (continueStoryBtn) {
    continueStoryBtn.addEventListener("click", () => {
        showScreen("storyEnd");
    });
}

let currentScreen = "intro";


/* نشانگر قلبی نئونی سفارشی */
(() => {
    const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    );

    if (!finePointer.matches) return;

    const cursor = document.createElement("div");
    cursor.className = "custom-heart-cursor";
    cursor.setAttribute("aria-hidden", "true");
    cursor.innerHTML = "<span>♥</span>";

    document.body.appendChild(cursor);

    let mouseX = -100;
    let mouseY = -100;
    let framePending = false;

    function updateCursor() {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        framePending = false;
    }

    window.addEventListener("pointermove", event => {
        if (event.pointerType === "touch") return;

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (!framePending) {
            framePending = true;
            requestAnimationFrame(updateCursor);
        }
    }, { passive: true });

    document.addEventListener("pointerover", event => {
        if (event.target.closest(
            "button, a, input, textarea, select, [role='button']"
        )) {
            cursor.classList.add("is-hovering");
        } else {
            cursor.classList.remove("is-hovering");
        }
    });

    window.addEventListener("pointerdown", () => {
        cursor.classList.add("is-clicking");
    });

    window.addEventListener("pointerup", () => {
        cursor.classList.remove("is-clicking");
    });

    window.addEventListener("blur", () => {
        cursor.style.opacity = "0";
    });

    window.addEventListener("focus", () => {
        cursor.style.opacity = "1";
    });
})();

function showScreen(name) {
    if (!screens[name]) return;

    Object.values(screens).forEach(screen => {
        screen.classList.add("hidden");
    });

    const target = screens[name];

    // اجرای دوباره انیمیشن‌های صفحه هنگام نمایش
    if (name === "letter") {
        const card = target.querySelector(".letter-card");
        card.style.animation = "none";

        void card.offsetWidth;

        card.style.animation = "";
    }

    target.classList.remove("hidden");
    currentScreen = name;
}


function celebrate() {
    const finalScreen = screens.final;
    const symbols = ["♥", "✦", "✧", "💜", "❤️"];

    for (let i = 0; i < 24; i++) {
        const particle = document.createElement("span");

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.position = "absolute";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${65 + Math.random() * 35}%`;
        particle.style.fontSize = `${16 + Math.random() * 22}px`;
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "2";
        particle.style.animation = `floatUp ${3 + Math.random() * 3}s linear forwards`;
        particle.style.animationDelay = `${Math.random() * 1.5}s`;

        finalScreen.appendChild(particle);

        particle.addEventListener("animationend", () => {
            particle.remove();
        }, { once: true });
    }
}

// بعد از ۵ ثانیه، اگر هنوز صفحه شروع نمایش داده می‌شود، نامه را باز کن.
window.setTimeout(() => {
    const introScreen = document.querySelector("#intro");
    const letterScreen = document.querySelector("#letter");

    if (
        introScreen &&
        letterScreen &&
        !introScreen.classList.contains("hidden")
    ) {
        showScreen("letter");
    }
}, 5000);

continueBtn.addEventListener("click", () => {
    showScreen("question");
});


const noReaction = document.querySelector("#noReaction");

noBtn.addEventListener("click", () => {
    noReaction.classList.remove("hidden");

    // افکت استیکر از ابتدا اجرا شود
    noReaction.style.animation = "none";
    void noReaction.offsetWidth;
    noReaction.style.animation = "";

    // بزرگ شدن دکمه آره
    yesBtn.classList.add("yes-growing");
});



function launchHeartBurst() {
    const burst = document.createElement("div");
    burst.className = "celebration-burst";
    burst.setAttribute("aria-hidden", "true");

    const symbols = ["♥", "❤", "♡", "✦", "✧", "✨", "💜"];
    const colors = [
        "#ff4dad",
        "#ff8acb",
        "#7a00ff",
        "#00d4ff",
        "#ffffff"
    ];

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
        return;
    }

    const particleCount = window.innerWidth < 600 ? 34 : 58;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("span");
        particle.className = "burst-particle";

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        const angle = Math.random() * Math.PI * 2;
        const distance = 100 + Math.random() *
            Math.min(window.innerWidth * 0.55, 420);

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.setProperty("--x", `${x}px`);
        particle.style.setProperty("--y", `${y}px`);
        particle.style.setProperty(
            "--duration",
            `${0.85 + Math.random() * 0.65}s`
        );
        particle.style.setProperty(
            "--delay",
            `${Math.random() * 0.12}s`
        );
        particle.style.setProperty(
            "--scale",
            `${0.5 + Math.random() * 1.3}`
        );
        particle.style.setProperty(
            "--rotation",
            `${Math.random() * 500 - 250}deg`
        );

        particle.style.color =
            colors[Math.floor(Math.random() * colors.length)];

        particle.style.fontSize = `${16 + Math.random() * 26}px`;

        burst.appendChild(particle);
    }

    document.body.appendChild(burst);

    window.setTimeout(() => {
        burst.remove();
    }, 1800);
}

let yesClicked = false;

yesBtn.addEventListener("click", () => {
    if (yesClicked) return;

    yesClicked = true;
    yesBtn.disabled = true;
    noBtn.disabled = true;

    launchHeartBurst();

    // اجازه می‌ده انفجار قلب‌ها دیده بشه، بعد صفحه کادو باز می‌شه.
    window.setTimeout(() => {
        showScreen("gift");
        yesBtn.disabled = false;
        noBtn.disabled = false;
        yesClicked = false;
    }, 950);
});



const giftBoxScene = document.querySelector("#giftBoxScene");
let giftAlreadyOpened = false;

foundBtn.addEventListener("click", () => {
    if (giftAlreadyOpened) return;

    giftAlreadyOpened = true;
    foundBtn.disabled = true;

    // در جعبه باز می‌شود
    giftBoxScene.classList.add("gift-opening");

    // نور و ذرات قلبی در لحظه بازشدن
    launchHeartBurst();

    // بعد از افکت بازشدن، پایان سینمایی نمایش داده می‌شود
    window.setTimeout(() => {
        showScreen("final");
        celebrate();
    }, 1100);
});
// باز کردن سورپرایز مخفی
if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener("click", () => {
        showScreen("surprise");
    });
}

/* ذرات جادویی مخصوص صفحه شروع */
(() => {
    const starsContainer = document.querySelector("#magicStars");

    if (!starsContainer || starsContainer.dataset.ready === "true") {
        return;
    }

    starsContainer.dataset.ready = "true";

    const symbols = ["✦", "✧", "·", "♡"];
    const fragment = document.createDocumentFragment();
    const count = window.innerWidth < 600 ? 34 : 55;

    for (let i = 0; i < count; i++) {
        const star = document.createElement("span");
        star.className = "magic-star";
        star.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.fontSize = `${8 + Math.random() * 13}px`;

        star.style.setProperty(
            "--star-duration",
            `${3 + Math.random() * 4}s`
        );

        star.style.setProperty(
            "--star-delay",
            `${-Math.random() * 6}s`
        );

        fragment.appendChild(star);
    }

    starsContainer.appendChild(fragment);
})();

/* ذرات تعاملی موس و لمس */
(() => {
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const allowedScreens = new Set([
    "intro",
    "letter",
    "question",
    "gift",
    "final",
    "surprise",
    "storyEnd"
]);
    const layer = document.createElement("div");

    layer.className = "interactive-magic-layer";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);

    const symbols = ["♡", "✦", "✧", "♥"];
    const colors = ["#ff4dad", "#d7a3ff", "#00d4ff", "#ffffff"];

    let lastSpawn = 0;
    let activeParticles = 0;

    function createParticle(x, y) {
        if (!allowedScreens.has(currentScreen)) return;
        if (activeParticles >= 35) return;

        const now = performance.now();

        // מגביל את קצב יצירת החלקיקים
        if (now - lastSpawn < 45) return;

        lastSpawn = now;
        activeParticles++;

        const particle = document.createElement("span");
        particle.className = "interactive-magic-particle";
        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.color =
            colors[Math.floor(Math.random() * colors.length)];

        particle.style.fontSize = `${12 + Math.random() * 15}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        particle.style.setProperty(
            "--drift-x",
            `${Math.random() * 70 - 35}px`
        );

        particle.style.setProperty(
            "--drift-y",
            `${-15 - Math.random() * 55}px`
        );

        layer.appendChild(particle);

        particle.addEventListener("animationend", () => {
            particle.remove();
            activeParticles = Math.max(0, activeParticles - 1);
        }, { once: true });
    }

    window.addEventListener("pointermove", event => {
        if (event.pointerType === "touch") return;
        createParticle(event.clientX, event.clientY);
    }, { passive: true });

    window.addEventListener("pointerdown", event => {
        if (event.pointerType !== "touch") return;
        createParticle(event.clientX, event.clientY);
    }, { passive: true });
})();

/* موسیقی پس‌زمینه */
(() => {
    const music = document.querySelector("#backgroundMusic");
    if (!music) {
        console.error("عنصر موسیقی در index.html پیدا نشد.");
        return;
    }

    music.loop = true;
    music.volume = 0.45;

    let started = false;

    async function startMusic() {
        if (started && !music.paused) return;

        try {
            await music.play();
            started = true;
            console.log("موسیقی با موفقیت پخش شد.");
        } catch (error) {
            console.warn("پخش خودکار مسدود شد؛ منتظر تعامل کاربر هستیم.", error);
        }
    }

    // تلاش اولیه برای پخش خودکار
    startMusic();

    // اگر مرورگر اجازه نداد، با اولین تعامل شروع کن
    function firstInteraction() {
        startMusic();
        document.removeEventListener("click", firstInteraction);
        document.removeEventListener("keydown", firstInteraction);
        document.removeEventListener("touchstart", firstInteraction);
    }

    document.addEventListener("click", firstInteraction);
    document.addEventListener("keydown", firstInteraction);
    document.addEventListener("touchstart", firstInteraction, { passive: true });
})();

/* افکت سینمایی سورپرایز مخفی */
(() => {
    const surpriseScreen = document.querySelector("#surprise");

    if (!surpriseScreen) return;

    const messageParagraphs = surpriseScreen.querySelectorAll(
        ".surprise-message p"
    );

    const ending = surpriseScreen.querySelector(".surprise-ending");
    const openButton = document.querySelector("#openSurpriseBtn");

    function playSurpriseAnimation() {
        // متن‌ها از ابتدا انیمیشن را اجرا کنند
        messageParagraphs.forEach((paragraph, index) => {
            paragraph.style.animation = "none";
            paragraph.style.opacity = "0";
            void paragraph.offsetWidth;

            paragraph.style.animation =
                `surpriseTextReveal 1s ease ${0.8 + index * 1.2}s forwards`;
        });

        if (ending) {
            ending.style.animation = "none";
            ending.style.opacity = "0";
            void ending.offsetWidth;

            ending.style.animation =
                `surpriseTextReveal 1.2s ease 7s forwards`;
        }
    }

    if (openButton) {
        openButton.addEventListener("click", () => {
            playSurpriseAnimation();
        });
    }
})();


/* ذرات جادویی صفحه ادامه داستان */
(() => {
    const storyScreen = document.querySelector("#storyEnd");
    const particlesContainer = document.querySelector("#storyParticles");

    if (!storyScreen || !particlesContainer) return;

    const symbols = ["♥", "♡", "✦", "✧", "✨"];
    const colors = ["#ff4dad", "#d7a3ff", "#7a00ff", "#00d4ff"];

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    // ذرات فقط یک بار ساخته می‌شوند
    if (particlesContainer.dataset.ready === "true") return;
    particlesContainer.dataset.ready = "true";

    const fragment = document.createDocumentFragment();
    const count = window.innerWidth < 600 ? 22 : 36;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement("span");
        particle.className = "story-particle";

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.fontSize = `${12 + Math.random() * 18}px`;
        particle.style.color =
            colors[Math.floor(Math.random() * colors.length)];

        particle.style.setProperty(
            "--duration",
            `${5 + Math.random() * 6}s`
        );

        particle.style.setProperty(
            "--delay",
            `${-Math.random() * 10}s`
        );

        particle.style.setProperty(
            "--drift",
            `${Math.random() * 100 - 50}px`
        );

        fragment.appendChild(particle);
    }

    particlesContainer.appendChild(fragment);
})();
