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
// --- CALENDAR FADE-IN (ALL MONTHS USE JAN IMAGE) ---
document.addEventListener("DOMContentLoaded", () => {
    const years = document.querySelectorAll(".year");

    // 12 months — all referencing the same image now
    const months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    years.forEach(year => {
        const monthsContainer = year.querySelector(".months");

        months.forEach(name => {
            const monthEl = document.createElement("div");
            monthEl.className = "month has-image";

            // Use the same image for all months
            monthEl.style.backgroundImage = `url('visuals/calendar.jpg')`;
            monthEl.style.backgroundSize = "contain";
            monthEl.style.backgroundRepeat = "no-repeat";
            monthEl.style.backgroundPosition = "center";

            monthsContainer.appendChild(monthEl);
        });
    });

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
