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
// --- CALENDAR FADE-IN WITH JAN ONLY ---
document.addEventListener("DOMContentLoaded", () => {
    const years = document.querySelectorAll(".year");

    // Months, with only January using an image
    const months = [
        { name: "Jan", img: "calendar-jan.png" },
        { name: "Feb", img: null },
        { name: "Mar", img: null },
        { name: "Apr", img: null },
        { name: "May", img: null },
        { name: "Jun", img: null },
        { name: "Jul", img: null },
        { name: "Aug", img: null },
        { name: "Sep", img: null },
        { name: "Oct", img: null },
        { name: "Nov", img: null },
        { name: "Dec", img: null }
    ];

    // Generate calendar boxes
    years.forEach(year => {
        const monthsContainer = year.querySelector(".months");

        months.forEach(m => {
            const monthEl = document.createElement("div");
            monthEl.className = "month";

            // Only January gets a background image
            if (m.img) {
                monthEl.style.backgroundImage = `url('visuals/${m.img}')`;
                monthEl.style.backgroundSize = "cover";
                monthEl.style.backgroundPosition = "center";
            } else {
                monthEl.textContent = m.name;  // blank square with text label
            }

            monthsContainer.appendChild(monthEl);
        });
    });

    // Fade-in on scroll
    function checkCalendars() {
        document.querySelectorAll(".month").forEach(m => {
            const rect = m.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.85) {
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
    
    if (!dotGrid) {
        console.log('Dot grid not found');
        return;
    }
    
    console.log('Initializing dot matrix...');
    
    // Clear any existing dots
    dotGrid.innerHTML = '';
    
    // First 50 dots are runaways (white)
    for (let i = 1; i <= 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot runaway';
        dotGrid.appendChild(dot);
    }
    
    // Next 45 dots are "knew trafficker" (gray)
    for (let i = 51; i <= 95; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot knew-trafficker';
        dotGrid.appendChild(dot);
    }
    
    // Remaining 5 dots are default (neither category)
    for (let i = 96; i <= 100; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dotGrid.appendChild(dot);
    }
    
    console.log('Dot matrix initialized with', dotGrid.children.length, 'dots');
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
