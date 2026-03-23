/* ---------------GENERAL WEBSITE--------------- */
// FADE-IN ANIMATION ON SCROLL
function checkFadeIn() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.75) {
            el.classList.add('visible');
        }
    });
}
// Show bottom nav only after scrolling past hero
function updateBottomNav() {
    const hero = document.querySelector('.hero-section');
    const nav = document.querySelector('.bottom-nav');
    if (!hero || !nav) return;
    const heroRect = hero.getBoundingClientRect();
    if (heroRect.bottom < window.innerHeight * 0.5) {
        nav.classList.add('nav-visible');
    } else {
        nav.classList.remove('nav-visible');
    }
}

// RUN ON LOAD
checkFadeIn();
checkSilhouettes();
updateBottomNav();
// SCROLL EVENTS
window.addEventListener('scroll', () => {
    checkFadeIn();
    updateRollingNumber();
    checkSilhouettes();
    updateBottomNav();
    updateThreeMoments();
});

/* ---------------THREE MOMENTS SECTION--------------- */
const MOMENTS_DATA = [
    { img: 'visuals/person1.png', name: 'Maya', age: '15', header: "Maya's Phone", messageId: 'momentsMessageMaya' },
    { img: 'visuals/person6.png', name: 'Jayden', age: '13', header: "Jayden's Phone", messageId: 'momentsMessageJayden' },
    { img: 'visuals/person2.png', name: 'Aisha', age: '22', header: "Aisha's Phone", messageId: 'momentsMessageAisha' }
];

function updateThreeMoments() {
    const section = document.getElementById('three-moments');
    if (!section) return;

    const wrapper = section.querySelector('.moments-scroll-wrapper');
    const phone = document.getElementById('momentsPhone');
    const persona = document.getElementById('momentsPersona');
    const personaImg = document.getElementById('momentsPersonaImg');
    const personaName = document.getElementById('momentsPersonaName');
    const personaAge = document.getElementById('momentsPersonaAge');
    const phoneHeader = document.getElementById('momentsPhoneHeader');
    const tagline = document.getElementById('momentsTagline');

    if (!wrapper || !phone || !persona) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = wrapper.offsetHeight;
    const scrollRange = sectionHeight - windowHeight;
    const progress = scrollRange <= 0 ? 0 : Math.max(0, Math.min(1, -rect.top / scrollRange));

    if (progress >= 0.12) {
        phone.classList.add('visible');
    } else {
        phone.classList.remove('visible');
    }

    const positionProgress = Math.min(progress / 0.2, 1);
    const shiftPx = positionProgress * -170;
    persona.style.transform = `translateX(${shiftPx}px)`;

    /* Wider progress bands = more scroll between each persona/phone moment */
    let activeIndex = 0;
    if (progress >= 0.62) activeIndex = 2;
    else if (progress >= 0.31) activeIndex = 1;

    const data = MOMENTS_DATA[activeIndex];
    personaImg.src = data.img;
    personaImg.alt = data.name;
    personaName.textContent = data.name;
    personaAge.textContent = `Age ${data.age}`;
    phoneHeader.textContent = data.header;

    document.getElementById('momentsMessageMaya').classList.toggle('visible', activeIndex === 0);
    document.getElementById('momentsMessageJayden').classList.toggle('visible', activeIndex === 1);
    document.getElementById('momentsMessageAisha').classList.toggle('visible', activeIndex === 2);

    if (progress >= 0.92) {
        tagline.classList.add('visible');
    } else {
        tagline.classList.remove('visible');
    }
}

window.addEventListener('load', updateThreeMoments);

/* ---------------SCALE SECTION--------------- */
// SILHOUETTE ANIMATION 
function checkSilhouettes() {
    const container = document.querySelector('.silhouette-container');
    if (!container) return;

    const silhouettes = container.querySelectorAll('.silhouette');
    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight * 0.8) {
        silhouettes.forEach((sil, index) => {
            sil.style.transitionDelay = `${index * 0.15}s`;  // stagger
            sil.classList.add('visible');
        });
    }
}
// CALENDAR (v2: 4-year day-grid)
document.addEventListener("DOMContentLoaded", () => {
    const mount = document.getElementById("arrestCalendar");
    if (!mount) return;

    const ARRESTS = 1416;
    const TECH_PCT = 0.673;
    const BACKPAGE_CASES = 592;

    const YEAR_DAYS = [365, 365, 366, 365];
    const TOTAL_DAYS = YEAR_DAYS.reduce((a, b) => a + b, 0);

    const TECH_CASES = Math.round(ARRESTS * TECH_PCT);
    const OTHER_TECH = Math.max(0, TECH_CASES - BACKPAGE_CASES);
    const NONTECH = ARRESTS - TECH_CASES;
    const NO_ARREST = TOTAL_DAYS - ARRESTS;

    const dayStates = [
        ...Array(BACKPAGE_CASES).fill("backpage"),
        ...Array(OTHER_TECH).fill("tech"),
        ...Array(NONTECH).fill("nontech"),
        ...Array(NO_ARREST).fill("empty"),
    ];

    let offset = 0;
    YEAR_DAYS.forEach((daysInYear, yearIdx) => {
        const block = document.createElement("div");
        block.className = "year-block";
        block.innerHTML = `
            <div class="year-label">Year ${yearIdx + 1}</div>
            <div class="year-grid"></div>
        `;

        const grid = block.querySelector(".year-grid");
        const CELLS = 371;

        for (let i = 0; i < CELLS; i++) {
            const cell = document.createElement("div");
            cell.className = "day empty";
            grid.appendChild(cell);
        }

        for (let d = 0; d < daysInYear; d++) {
            const state = dayStates[offset + d];
            const cell = grid.children[d];
            cell.className = `day ${state}`;
            cell.title =
                state === "backpage" ? "Arrest: Backpage involved" :
                state === "tech" ? "Arrest: technology involved" :
                state === "nontech" ? "Arrest: no technology listed" :
                "No arrest day (in this 4-year illustration)";
        }

        offset += daysInYear;
        mount.appendChild(block);
    });

    function revealYearBlocks() {
        document.querySelectorAll(".year-block").forEach((b) => {
            const rect = b.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) b.classList.add("visible");
        });
    }

    window.addEventListener("scroll", revealYearBlocks);
    revealYearBlocks();
});
// $236B: bills slide from alternate sides into a stack, then mountain2 + stat
(function () {
    const section = document.getElementById('wealth-height-cinematic');
    const billsLayer = document.getElementById('wealthBillsLayer');
    const mountainLayer = document.getElementById('wealthMountainLayer');
    const mountainCaption = document.getElementById('wealthMountainCaption');
    if (!section || !billsLayer || !mountainLayer || !mountainCaption) return;

    const BILL_COUNT = 48;
    const BILL_IMG = 'visuals/bill.png';
    /** Stack completes in this fraction of scroll progress (lower = less scrolling to finish the stack) */
    const STACK_PROGRESS_END = 0.48;
    /** Mountain + bill crossfade uses the rest of the scroll — ends at 1 so there’s no dead scroll after */
    const MOUNTAIN_FADE_START = 0.4;
    const MOUNTAIN_FADE_END = 1;

    /** Matches .wealth-mountain-img: max-width min(92vw, 560px) */
    function mountainImageWidthPx() {
        return Math.min(window.innerWidth * 0.92, 560);
    }

    function smoothstep(t) {
        const x = Math.max(0, Math.min(1, t));
        return x * x * (3 - 2 * x);
    }

    for (let i = 0; i < BILL_COUNT; i++) {
        const img = document.createElement('img');
        img.src = BILL_IMG;
        img.alt = '';
        img.className = 'wealth-bill';
        img.decoding = 'async';
        billsLayer.appendChild(img);
    }

    const bills = billsLayer.querySelectorAll('.wealth-bill');

    function updateWealthCinematic() {
        const rect = section.getBoundingClientRect();
        const scrollRange = section.offsetHeight - window.innerHeight;
        const progress = scrollRange <= 0 ? 0 : Math.max(0, Math.min(1, -rect.top / scrollRange));

        const stackCap = STACK_PROGRESS_END;
        const baseBillW = mountainImageWidthPx();
        const maxSlide = Math.min(window.innerWidth * 0.42, baseBillW * 0.65);

        const introEl = document.querySelector('.wealth-cinematic-sticky .wealth-intro-text');
        const rowEl = document.querySelector('.wealth-mountain-row');
        let firstBillDropPx = 150;
        if (introEl && rowEl) {
            const ib = introEl.getBoundingClientRect().bottom;
            const rb = rowEl.getBoundingClientRect().bottom;
            const span = rb - ib - 10;
            /* Shorter drop = first bill starts lower on the page (closer to stack base) */
            firstBillDropPx = Math.max(65, Math.min(span * 0.5, window.innerHeight * 0.26));
        }

        bills.forEach((bill, i) => {
            const fromLeft = i % 2 === 0;
            const span = stackCap / BILL_COUNT;
            const t0 = (i / BILL_COUNT) * stackCap;
            const raw = span > 0 ? (progress - t0) / span : 1;
            const local = smoothstep(raw);
            const slide =
                i === 0 ? 0 : (1 - local) * maxSlide * (fromLeft ? -1 : 1);
            const slideY = i === 0 ? (1 - local) * -firstBillDropPx : 0;
            const bottomPx = i * 4;
            const stackScale = Math.max(0.62, 1 - i * 0.006);
            const billW = baseBillW * stackScale;
            bill.style.width = `${billW}px`;
            bill.style.bottom = `${bottomPx}px`;
            bill.style.zIndex = String(i);
            bill.style.transform = `translate(-50%, ${slideY}px) translateX(${slide}px)`;
            bill.style.opacity = String(local);
        });

        let mountainT = 0;
        if (progress >= MOUNTAIN_FADE_START) {
            mountainT = (progress - MOUNTAIN_FADE_START) / (MOUNTAIN_FADE_END - MOUNTAIN_FADE_START);
            mountainT = Math.max(0, Math.min(1, mountainT));
        }
        const mountainOpacity = String(smoothstep(mountainT));
        mountainLayer.style.opacity = mountainOpacity;
        mountainCaption.style.opacity = mountainOpacity;
        const mountainInteractive = mountainT > 0.95 ? 'auto' : 'none';
        mountainLayer.style.pointerEvents = mountainInteractive;
        mountainCaption.style.pointerEvents = mountainInteractive;

        const billsFade = 1 - smoothstep((progress - MOUNTAIN_FADE_START) / (MOUNTAIN_FADE_END - MOUNTAIN_FADE_START + 0.001));
        billsLayer.style.opacity = String(Math.max(0, Math.min(1, billsFade)));
    }

    window.addEventListener('scroll', updateWealthCinematic, { passive: true });
    window.addEventListener('resize', updateWealthCinematic);
    window.addEventListener('load', updateWealthCinematic);
    updateWealthCinematic();
})();

/* ---------------TECHNOLOGY SECTION--------------- */
// CLEAN SPIDERWEB
const webCanvas = document.getElementById("webVisualization");
if (webCanvas) {
    const ctx = webCanvas.getContext("2d");

    function resizeWeb() {
        webCanvas.width = webCanvas.offsetWidth;
        webCanvas.height = webCanvas.offsetHeight;
    }
    resizeWeb();
    window.addEventListener("resize", resizeWeb);

    function drawSpiderWeb(progress) {
        const w = webCanvas.width;
        const h = webCanvas.height;
        const cx = w / 2;
        const cy = h / 2;

        ctx.clearRect(0, 0, w, h);

        const maxRings = 12;
        const maxRadials = 24;

        const rings = Math.floor(2 + progress * (maxRings - 2));
        const radials = Math.floor(3 + progress * (maxRadials - 3));

        const maxRadius = Math.min(w, h) * 0.45;

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1.2;

        for (let i = 0; i < radials; i++) {
            const angle = (i / radials) * Math.PI * 2;
            const x = cx + Math.cos(angle) * maxRadius * progress;
            const y = cy + Math.sin(angle) * maxRadius * progress;

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        for (let r = 1; r <= rings; r++) {
            const radius = (r / rings) * maxRadius * progress;

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }

    function updateWeb() {
        const rect = webCanvas.getBoundingClientRect();
        const viewport = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - rect.top / viewport));

        drawSpiderWeb(progress);
    }

    window.addEventListener("scroll", updateWeb);
    updateWeb();
}
// AD BAR
function updateAdBar() {
    const bar = document.getElementById("adBar");
    if (!bar) return;

    const blocks = bar.querySelectorAll(".ad-block");
    const section = document.querySelector(".ad-bar-container");

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = 1 - (rect.top / windowHeight);
    progress = Math.max(0, Math.min(1, progress * 1.3));

    const totalBlocks = 10;
    const filledBlocks = Math.floor(progress * totalBlocks);

    blocks.forEach((block, i) => {
        if (i < filledBlocks) {
            if (i < 8) {
                block.classList.add("filled-red");
                block.classList.remove("filled-gray");
                block.textContent = "ad";
            } else {
                block.classList.add("filled-gray");
                block.classList.remove("filled-red");
                block.textContent = "";
            }
        } else {
            block.classList.remove("filled-red", "filled-gray");
            block.textContent = "";
        }
    });
}

window.addEventListener("scroll", updateAdBar);
window.addEventListener("load", updateAdBar);
// PLATFORM CARDS
function activatePlatformCards() {
    const platformCards = document.querySelectorAll('.platform-card');

    platformCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight * 0.8) {
            card.classList.add('visible');
            const icon = card.querySelector('.icon');
            icon.classList.add('pulse');
        }
    });
}
window.addEventListener('scroll', activatePlatformCards);
window.addEventListener('load', activatePlatformCards);

// Technology image scroll crossfades
function initializeTechScrollCrossfades() {
    const containers = document.querySelectorAll('.tech-scroll-crossfade');
    if (!containers.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updaters = [];
    containers.forEach((container) => {
        const first = container.querySelector('.tech-crossfade-image--first');
        const second = container.querySelector('.tech-crossfade-image--second');
        if (!first || !second) return;

        if (prefersReducedMotion) {
            first.style.opacity = '1';
            second.style.opacity = '0';
            return;
        }

        const updateCrossfade = () => {
            const rect = container.getBoundingClientRect();
            const viewport = window.innerHeight;
            const start = viewport * 0.48;
            const end = viewport * 0.2;
            const rawProgress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
            const progress = Math.pow(rawProgress, 2.0);

            first.style.opacity = String(1 - progress);
            second.style.opacity = String(progress);
        };

        updaters.push(updateCrossfade);
        updateCrossfade();
    });

    if (!updaters.length) return;
    const updateAllCrossfades = () => updaters.forEach((update) => update());

    window.addEventListener('scroll', updateAllCrossfades, { passive: true });
    window.addEventListener('resize', updateAllCrossfades);
    window.addEventListener('load', updateAllCrossfades);
}

initializeTechScrollCrossfades();

/* ---------------PROFILES SECTION--------------- */
// DOT MATRIX VISUALIZATION
function initializeDotMatrix() {
    const dotGrid = document.querySelector('.dot-grid');
    if (!dotGrid) return;

    dotGrid.innerHTML = '';

    for (let i = 1; i <= 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot runaway';
        dotGrid.appendChild(dot);
    }

    for (let i = 51; i <= 95; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot knew-trafficker';
        dotGrid.appendChild(dot);
    }

    for (let i = 96; i <= 100; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dotGrid.appendChild(dot);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDotMatrix);
} else {
    initializeDotMatrix();
}
window.addEventListener('load', initializeDotMatrix);
// PIE CHART VISUALIZATION
function drawPieChart(canvasId, femalePercent) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const total = 100;
    const female = femalePercent;
    const male = total - female;

    const femaleAngle = (female / 100) * 2 * Math.PI;

    ctx.beginPath();
    ctx.moveTo(90, 90);
    ctx.fillStyle = "#555";
    ctx.arc(90, 90, 80, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(90, 90);
    ctx.fillStyle = "#ffffff";
    ctx.arc(90, 90, 80, -Math.PI / 2, -Math.PI / 2 + femaleAngle);
    ctx.fill();
}

window.addEventListener("load", () => {
    drawPieChart("pieAll", 9);
    drawPieChart("pieChild", 6);
});

/* ---------------SCROLLING STAT SECTION--------------- */
// ROLLING NUMBER EFFECT
function updateRollingNumber() {
    const numberEl = document.getElementById('rollingNumber');
    const scrolled = window.scrollY;
    const stickyStart = document.querySelector('.sticky-section').offsetTop;
    const progress = Math.max(0, scrolled - stickyStart) / 1000;
    
    const targetNumber = 21865; 
    const currentNumber = Math.min(Math.floor(progress * targetNumber), targetNumber);
    numberEl.textContent = `[${currentNumber}]`;
}

/* ---------------HOSPITALITY SECTION--------------- */
// PEOPLE MATRIX VISUALIZATION
(function () {
    const pictograph = document.getElementById('pictograph');
    const total = 100;
    const filled = 75;

    for (let i = 0; i < total; i++) {
        const icon = document.createElement('div');
        icon.textContent = i < filled ? '👤' : '⚫️';
        pictograph.appendChild(icon);
    }

    window.addEventListener('scroll', () => {
        const rect = pictograph.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            pictograph.classList.add('show');
        }
    });
})();