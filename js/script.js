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
// SPIDERWEB VISUALIZATION (v2)
// =============================

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

    // Generate web nodes and edges
    function generateWeb(density) {
        const nodes = [];
        const edges = [];

        // Start with ~4 nodes and grow up to ~400 (≈900% increase)
        const numNodes = Math.floor(4 + density * 396);

        for (let i = 0; i < numNodes; i++) {
            // Positions in a "zoomed-out" circle that expands as density increases
            const angle = Math.random() * Math.PI * 2;
            const radius = (width / 10) + density * (width / 1.2) * Math.random();
            const x = width / 2 + Math.cos(angle) * radius;
            const y = height / 2 + Math.sin(angle) * radius;
            nodes.push({ x, y });
        }

        // Connect nearby nodes (simulate threads)
        for (let i = 0; i < numNodes; i++) {
            for (let j = i + 1; j < numNodes; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                // closer nodes are more likely to connect
                if (dist < 100 + density * 200 && Math.random() < 0.04 * density) {
                    edges.push([i, j]);
                }
            }
        }

        return { nodes, edges };
    }

    function drawWeb(web, density) {
        ctx.clearRect(0, 0, width, height);
        ctx.save();

        // Apply zoom-out effect — smaller scale at start, normal at full density
        const scale = 1 - 0.8 * (1 - density); // zoom from 0.2x → 1x
        ctx.translate(width / 2, height / 2);
        ctx.scale(scale, scale);
        ctx.translate(-width / 2, -height / 2);

        // Draw faint connecting lines
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 1;
        web.edges.forEach(([i, j]) => {
            ctx.beginPath();
            ctx.moveTo(web.nodes[i].x, web.nodes[i].y);
            ctx.lineTo(web.nodes[j].x, web.nodes[j].y);
            ctx.stroke();
        });

        // Draw small glowing nodes
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        web.nodes.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    }

    // Scroll-based animation
    function updateWebOnScroll() {
        const rect = canvas.getBoundingClientRect();
        const visibleRatio = Math.max(0, Math.min(1, 1 - Math.abs(rect.top) / window.innerHeight));

        const web = generateWeb(visibleRatio);
        drawWeb(web, visibleRatio);
    }

    window.addEventListener("scroll", updateWebOnScroll);
    updateWebOnScroll();
}

// Run on load
checkFadeIn();
