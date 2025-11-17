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

// WEB ANIMATION
function animateWeb() {
    const small = document.getElementById("web2010");
    const large = document.getElementById("web2015");

    const rect = large.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.8;

    if (inView) {
        small.style.opacity = "1";
        small.style.transform = "translate(-50%, -50%) scale(1)";
        
        setTimeout(() => {
            large.style.opacity = "1";
            large.style.transform = "translate(-50%, -50%) scale(1)";
        }, 400);
    }
}

document.addEventListener("scroll", animateWeb);

