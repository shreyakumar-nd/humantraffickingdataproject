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
// SPIDERWEB VISUALIZATION
// =============================

// Simple web visualization that grows as user scrolls
const canvas = document.getElementById("webVisualization");
if (canvas) {
    const ctx = canvas.getContext("2d");
    let width, height;

    function resizeCanvas() {
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width;
        canvas.height = height;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Generate web nodes and edges dynamically
    function generateWeb(density) {
        const nodes = [];
        const edges = [];

        const numNodes = Math.floor(10 + density * 100); // 10 → ~110 nodes
        for (let i = 0; i < numNodes; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
            });
        }

        // Connect nodes randomly
        for (let i = 0; i < numNodes; i++) {
            for (let j = i + 1; j < numNodes; j++) {
                if (Math.random() < 0.03 * density) { // higher density = more edges
                    edges.push([i, j]);
                }
            }
        }

        return { nodes, edges };
    }

    function drawWeb(web) {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 1;

        // Draw edges
        web.edges.forEach(([i, j]) => {
            ctx.beginPath();
            ctx.moveTo(web.nodes[i].x, web.nodes[i].y);
            ctx.lineTo(web.nodes[j].x, web.nodes[j].y);
            ctx.stroke();
        });

        // Draw nodes
        ctx.fillStyle = "white";
        web.nodes.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Scroll interaction
    function updateWebOnScroll() {
        const rect = canvas.getBoundingClientRect();
        const visibleRatio = Math.max(0, Math.min(1, 1 - Math.abs(rect.top) / window.innerHeight));
        // visibleRatio ~ 0 when off-screen, ~1 when centered in view

        const web = generateWeb(visibleRatio); // gradually increase density
        drawWeb(web);
    }

    window.addEventListener("scroll", updateWebOnScroll);
    updateWebOnScroll();
}

// Run on load
checkFadeIn();
