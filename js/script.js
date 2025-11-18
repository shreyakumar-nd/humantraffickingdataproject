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

// ROLLING NUMBER EFFECT (for sticky section)
function updateRollingNumber() {
    const numberEl = document.getElementById('rollingNumber');
    const scrolled = window.scrollY;
    const stickyStart = document.querySelector('.sticky-section').offsetTop;
    const progress = Math.max(0, scrolled - stickyStart) / 1000;
    
    // Replace [XXX] with your target number
    const targetNumber = 21865; 
    const currentNumber = Math.min(Math.floor(progress * targetNumber), targetNumber);
    numberEl.textContent = `[${currentNumber}]`;
}

// --- CALENDAR FADE-IN WITH IMAGE BACKGROUNDS ---
document.addEventListener("DOMContentLoaded", () => {
    const monthsContainer = document.querySelector(".months");

    // 48 months = 4 years × 12 months
    for (let i = 0; i < 48; i++) {
        const monthEl = document.createElement("div");
        monthEl.classList.add("month", "has-image");
        monthsContainer.appendChild(monthEl);
    }

    // Fade-in on scroll
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


// SCROLL EVENTS
window.addEventListener('scroll', () => {
    checkFadeIn();
    updateRollingNumber();
});


// DOT MATRIX VISUALIZATION - Generate 100 dots
function initializeDotMatrix() {
    const dotGrid = document.querySelector('.dot-grid');
    if (!dotGrid) return;

    dotGrid.innerHTML = '';

    // First 50 dots: runaways
    for (let i = 1; i <= 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot runaway';
        dotGrid.appendChild(dot);
    }

    // Next 45 dots: knew trafficker
    for (let i = 51; i <= 95; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot knew-trafficker';
        dotGrid.appendChild(dot);
    }

    // Remaining 5 dots: other/unknown
    for (let i = 96; i <= 100; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dotGrid.appendChild(dot);
    }
}

// Run when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDotMatrix);
} else {
    // DOM already loaded, run immediately
    initializeDotMatrix();
}

// Also run on window load as backup
window.addEventListener('load', initializeDotMatrix);


// Run on load
checkFadeIn();

function drawPieChart(canvasId, femalePercent) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const total = 100;
    const female = femalePercent;
    const male = total - female;

    // convert % to radians
    const femaleAngle = (female / 100) * 2 * Math.PI;

    // draw male section (dark gray)
    ctx.beginPath();
    ctx.moveTo(90, 90);
    ctx.fillStyle = "#555";
    ctx.arc(90, 90, 80, 0, 2 * Math.PI);
    ctx.fill();

    // draw female section (white)
    ctx.beginPath();
    ctx.moveTo(90, 90);
    ctx.fillStyle = "#ffffff";
    ctx.arc(90, 90, 80, -Math.PI / 2, -Math.PI / 2 + femaleAngle);
    ctx.fill();
}

// Run pie charts after page loads
window.addEventListener("load", () => {
    drawPieChart("pie2022", 9);   // 9% female
    drawPieChart("pie2023", 21);  // 21% female
});

// hospitality visualization
(function () {
    const pictograph = document.getElementById('pictograph');
    const total = 100;
    const filled = 75;

    for (let i = 0; i < total; i++) {
      const icon = document.createElement('div');
      icon.textContent = i < filled ? '👤' : '⚪';
      pictograph.appendChild(icon);
    }

    // reveal animation on scroll
    window.addEventListener('scroll', () => {
      const rect = pictograph.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        pictograph.classList.add('show');
      }
    });
  })();

// CLEAN GEOMETRIC SPIDERWEB
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

        // WEB PARAMETERS
        const maxRings = 12;              // how many radial rings at full expansion
        const maxRadials = 24;            // how many spokes at full expansion

        const rings = Math.floor(2 + progress * (maxRings - 2));
        const radials = Math.floor(3 + progress * (maxRadials - 3));

        const maxRadius = Math.min(w, h) * 0.45;

        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 1.2;

        // Draw radial lines (spokes)
        for (let i = 0; i < radials; i++) {
            const angle = (i / radials) * Math.PI * 2;
            const x = cx + Math.cos(angle) * maxRadius * progress;
            const y = cy + Math.sin(angle) * maxRadius * progress;

            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(x, y);
            ctx.stroke();
        }

        // Draw circular rings
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

        // progress = 0 → small web
        // progress = 1 → full web
        const progress = Math.max(0, Math.min(1, 1 - rect.top / viewport));

        drawSpiderWeb(progress);
    }

    window.addEventListener("scroll", updateWeb);
    updateWeb();
}

// SCROLL-BASED AD BAR PROGRESS (10-block horizontal bar)
function updateAdBar() {
    const bar = document.getElementById("adBar");
    if (!bar) return;

    const blocks = bar.querySelectorAll(".ad-block");
    const section = document.querySelector(".ad-bar-container");

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // progress from 0 → 1 while section scrolls through view
    let progress = 1 - (rect.top / windowHeight);
    // progress = Math.max(0, Math.min(1, progress)); // clamp between 0–1
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

// add to scroll events without disrupting your existing listeners
window.addEventListener("scroll", updateAdBar);
window.addEventListener("load", updateAdBar);

