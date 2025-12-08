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
// RUN ON LOAD
checkFadeIn();
checkSilhouettes();
// SCROLL EVENTS
window.addEventListener('scroll', () => {
    checkFadeIn();
    updateRollingNumber();
    checkSilhouettes();
});

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
// CALENDAR ANIMATION
document.addEventListener("DOMContentLoaded", () => {
    const monthsContainer = document.querySelector(".months");

    for (let i = 0; i < 48; i++) {
        const monthEl = document.createElement("div");
        monthEl.classList.add("month", "has-image");
        monthsContainer.appendChild(monthEl);
    }

    function checkCalendars() {
        document.querySelectorAll(".month").forEach(m => {
            const rect = m.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                m.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", checkCalendars);
    checkCalendars();
});
// MONEY/MOUNTAIN ANIMATION
(function() {

  const section = document.getElementById('wealth-height-cinematic');
  const mountain = document.querySelector('.mountain-stack');
  const money = document.querySelector('.money-stack');

  function updateCinematic() {
   const rect = section.getBoundingClientRect();
   const progress = Math.min(Math.max((window.innerHeight - rect.top) / (rect.height - window.innerHeight), 0), 1);

   const maxMountains = 8;
   const mountainHeight = progress * maxMountains * 300;

   const maxMoneyHeight = 3000;
   const moneyHeight = progress * maxMoneyHeight;

   mountain.style.height = `${mountainHeight}px`;
   money.style.height = `${moneyHeight}px`;
 }

  window.addEventListener('scroll', updateCinematic);
  window.addEventListener('resize', updateCinematic);
  updateCinematic();
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