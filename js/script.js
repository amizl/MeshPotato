/* * Main Deck Controller 
 * Handles navigation, progress bars, and modal interactions.
 */

// --- Data for Service Modals ---
const servicesData = [
    {
        title: "Execution & Launch",
        icon: "rocket",
        desc: "One-click deployment to crowdfunding platforms once teams and projects are finalized. Includes integrated milestone tracking and launch readiness checks before public funding can be activated."
    },
    {
        title: "Sponsored Projects",
        icon: "trophy",
        desc: "Engine and platform-sponsored initiatives where top-ranked teams and ideas receive funding tied directly to execution milestones. Platforms fund specific outcomes, not just pitches."
    },
    {
        title: "Assets & Tools",
        icon: "storefront",
        desc: "A shared internal marketplace for game assets, tools, and systems. Teams can buy, sell, or trade verified code and art assets within the execution network."
    },
    {
        title: "Specialist Talent Pool",
        icon: "engineering",
        desc: "Access to independent specialists available for short-term execution support. These 'mercenaries' are not assigned to teams or tied to long contracts but are used to unblock specific progress hurdles."
    },
    {
        title: "Smart Visibility",
        icon: "campaign",
        desc: "Integrated access to targeted advertising tied to project status and genre. Promotion is triggered algorithmically by execution milestones, ensuring visibility is earned by progress, not hype."
    },
    {
        title: "Player Signal",
        icon: "query_stats",
        desc: "Ongoing gamer surveys and aggregated wishlist data provided to teams. This allows developers to build features based on validated player demand rather than guesswork."
    },
    {
        title: "Structured Support",
        icon: "forum",
        desc: "Community support focused purely on execution problems. Moderated and goal-driven forums designed to solve technical or production blockers, not for general social chatter."
    },
    {
        title: "Team Readiness",
        icon: "school",
        desc: "Free training modules on working in teams and collaborative execution. Includes built-in collaboration tools and templates designed specifically for first-time team members."
    }
];

// --- Modal Logic ---
function openModal(index) {
    const modal = document.getElementById('service-modal');
    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-desc');
    const icon = document.getElementById('modal-icon');
    const data = servicesData[index];

    if (data) {
        title.textContent = data.title;
        desc.textContent = data.desc;
        icon.textContent = data.icon;
        modal.classList.add('open');
    }
}

function closeModal() {
    document.getElementById('service-modal').classList.remove('open');
}

// --- Slide Navigation State ---
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progress-bar');
const slideCounter = document.getElementById('slide-counter');

function updateSlide(direction = 0) {
    slides.forEach((slide, index) => {
        // Handle "leaving" animation class
        if (direction === 1 && index === currentSlide - 1) {
            slide.classList.add('leaving');
        } else {
            slide.classList.remove('leaving');
        }
        
        // Handle active state
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });
    
    // Update Progress Bar Width
    const progress = ((currentSlide + 1) / slides.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Update Counter Text (e.g., 01/11)
    slideCounter.innerText = `${(currentSlide + 1).toString().padStart(2, '0')}/${slides.length}`;
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateSlide(1);
        playClickSound();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlide(-1);
        playClickSound();
    }
}

// --- Event Listeners ---

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'Escape') closeModal();
});

// Audio Feedback (Mechanical Click using Tone.js)
function playClickSound() {
    try {
        const synth = new Tone.MembraneSynth().toDestination();
        synth.triggerAttackRelease("C2", "32n");
    } catch (e) {
        // Ignore errors if Tone.js isn't ready or audio context is blocked
    }
}

// Initialize Deck
updateSlide();