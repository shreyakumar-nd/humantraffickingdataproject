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

// ===============================
// EXPANDING WEB VISUALIZATION
// ===============================
const webCanvas = document.getElementById("expandingWeb");

if (webCanvas) {
    const ctx = webCanvas.getContext("2d");

    function resizeWebCanvas() {
        webCanvas.width = webCanvas.offsetWidth;
        webCanvas.height = webCanvas.offsetHeight;
    }

    resizeWebCanvas();
    window.addEventListener("resize", resizeWebCanvas);

    // Generate node positions based on density (0 = tiny, 1 = huge)
    function generateNodes(density) {
        const nodes = [];
        const count = Math.floor(4 + density * 350); // 4 → ~354 (≈900% growth)

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = (webCanvas.width * 0.05) + density * (webCanvas.width * 0.45) * Math.random();
            const x = webCanvas.width / 2 + Math.cos(angle) * radius;
            const y = webCanvas.height / 2 + Math.sin(angle) * radius;
            nodes.push({ x, y });
        }

        return nodes;
    }

    // Generate lightweight edges
    function generateEdges(nodes, density) {
        const edges = [];
        const threshold = 40 + density * 120;

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < threshold) {
                    edges.push([nodes[i], nodes[j]]);
                }
            }
        }
        return edges;
    }

    function drawWeb(density) {
        ctx.clearRect(0, 0, webCanvas.width, webCanvas.height);

        const nodes = generateNodes(density);
        const edges = generateEdges(nodes, density);

        // Draw edges first
        ctx.strokeStyle = `rgba(255,255,255,${0.08 + density * 0.22})`;
        ctx.lineWidth = 1;

        edges.forEach(([a, b]) => {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        });

        // Draw glowing nodes
        nodes.forEach(n => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${0.3 + density * 0.7})`;

            // glow
            ctx.shadowBlur = 8 * density;
            ctx.shadowColor = "white";

            ctx.fill();
            ctx.shadowBlur = 0;
        });
    }

    function updateWebScroll() {
        const rect = webCanvas.getBoundingClientRect();

        // Progress based on how much of the section is visible
        const density = Math.min(
            1,
            Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight * 1.2))
        );

        drawWeb(density);
    }

    window.addEventListener("scroll", updateWebScroll);
    updateWebScroll();
}
