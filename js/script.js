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

// SCROLL EVENTS
window.addEventListener('scroll', () => {
    checkFadeIn();
    updateRollingNumber();
});

// =============================
// DIGITAL GRID VISUALIZATION
// =============================

const gridCanvas = document.getElementById("gridVisualization");
if (gridCanvas) {
    const gtx = gridCanvas.getContext("2d");
    let w, h;

    function resizeGrid() {
        w = gridCanvas.offsetWidth;
        h = gridCanvas.offsetHeight;
        gridCanvas.width = w;
        gridCanvas.height = h;
    }
    resizeGrid();
    window.addEventListener("resize", resizeGrid);

    // Create a fixed grid of dots
    const cols = 40;
    const rows = 25;
    let dots = [];

    function initDots() {
        dots = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                dots.push({
                    x: (x + 0.5) * (w / cols),
                    y: (y + 0.5) * (h / rows),
                    lit: false
                });
            }
        }
    }

    function drawGrid(progress) {
        gtx.clearRect(0, 0, w, h);

        const litCount = Math.floor(dots.length * progress);

        for (let i = 0; i < dots.length; i++) {
            const d = dots[i];
            const isLit = i < litCount;

            gtx.beginPath();
            gtx.arc(d.x, d.y, isLit ? 3 : 2, 0, Math.PI * 2);
            gtx.fillStyle = isLit ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)";
            gtx.fill();
        }
    }

    initDots();
    drawGrid(0);

    // Scroll-based activation
    function updateGridOnScroll() {
        const rect = gridCanvas.getBoundingClientRect();
        const visibleRatio = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));

        // 846% ≈ 8.46x — so light up to 90% of nodes
        const scaledProgress = visibleRatio * 0.90;

        drawGrid(scaledProgress);
    }

    window.addEventListener("scroll", updateGridOnScroll);
    updateGridOnScroll();
}
