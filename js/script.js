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

function openModal(index) {
    const modal = document.getElementById('service-modal');
    const title = document.getElementById('modal-title');
    const desc = document.getElementById('modal-desc');
    const icon = document.getElementById('modal-icon');
    const data = servicesData[index];

    if (!data) return;

    title.textContent = data.title;
    icon.textContent = data.icon;

    // IMPORTANT: render HTML, not text
    desc.innerHTML = data.desc;

    modal.classList.add('open');
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
const SOLO_TRAP_INDEX = servicesData.length;

// New! Solo Trap deep-dive modal
servicesData.push({
    title: "Why Late Hiring Fails",
    icon: "warning",
    desc: `
        <p>
        Early in a project, work is easy to split.
        </p>

        <p class="mt-2">
        Different people can work in parallel on separate parts.
        </p>

        <ul class="list-disc pl-6 space-y-2 mt-4">
        <li>Gameplay systems, levels, art, sound can be built independently</li>
        <li>Changes stay local and don’t break other work</li>
        </ul>

        <p class="mt-4">
        As the project progresses, everything becomes connected.
        </p>

        <ul class="list-disc pl-6 space-y-2 mt-2">
        <li>Changes affect multiple systems at once</li>
        <li>Bugs ripple across unrelated parts</li>
        <li>Fixes require meetings, coordination, and rework</li>
        <li>New hires slow progress before they help</li>
        </ul>

        <p class="mt-4">
        Adding people late doesn’t increase speed. It increases friction.
        </p>

        <p class="font-bold mt-4">
        Teams must form early, while the work is still easy to divide.
        </p>
        `
});


// New! Psychometrics deep dive
// New! Psychometrics deep dive
servicesData.push({
    title: "Psychometrics",
    icon: "psychology",
    desc: `
        <p><strong>Purpose:</strong> Understand how people work before teams form.</p>

        <ul class="list-disc pl-6 space-y-2">
        <li>How people break down and solve problems</li>
        <li>How they handle uncertainty and pressure</li>
        <li>Whether they take ownership or wait for direction</li>
        <li>How they respond to feedback and conflict</li>
        <li>Consistency and follow-through over time</li>
        </ul>

        <p class="mt-4">
        This is not a personality test.
        </p>

        <p class="mt-4">
        It focuses on real working behavior and decision patterns that affect team success.
        </p>
        `
});



// New! Tech Vetting deep dive
servicesData.push({
    title: "Tech Vetting",
    icon: "code",
    desc: `
            <p><strong>Purpose:</strong> Confirm people can actually do the work.</p>

            <h4 class="font-bold mt-4">What we check</h4>
            <ul class="list-disc pl-6 space-y-2">
            <li>Practical tests based on the actual role</li>
            <li>Review of real code, art, or production work</li>
            <li>Ability to debug, adapt, and finish tasks</li>
            <li>Understanding of real production workflows</li>
            </ul>

            <h4 class="font-bold mt-4">Validation</h4>
            <ul class="list-disc pl-6 space-y-2">
            <li>Endorsements from people who have shipped before</li>
            <li>Cross-role confirmation from teammates they worked with</li>
            </ul>

            <h4 class="font-bold mt-4">Team Lead Interview</h4>
            <p>
            A short, structured conversation focused on decision-making and responsibility.
            </p>
            `
});


// New! Track Record deep dive
servicesData.push({
    title: "Track Record",
    icon: "history",
    desc: `
        <p><strong>Purpose:</strong> Base trust on real experience.</p>

        <ul class="list-disc pl-6 space-y-2">
        <li>Games or products that were actually released</li>
        <li>Clear role and responsibility on each project</li>
        <li>Previous teams or companies worked with</li>
        <li>Length of experience doing similar work</li>
        <li>Size and scope of past projects</li>
        </ul>

        <h4 class="font-bold mt-4">Reputation Signals</h4>
        <ul class="list-disc pl-6 space-y-2">
        <li>References from past teammates</li>
        <li>History of working with the same people again</li>
        <li>Evidence of surviving full production cycles</li>
        </ul>
        `
});

function toggleServiceAccordion(card) {
    const index = card.dataset.serviceIndex;
    const accordion = card.querySelector(".service-accordion");
    const data = servicesData[index];

    const isOpen = accordion.classList.contains("open");

    // Close all others
    document.querySelectorAll(".service-accordion").forEach(el => {
        el.classList.remove("open");
        el.classList.add("hidden");
        el.innerHTML = "";
    });

    if (!isOpen) {
        accordion.innerHTML = data.desc;
        accordion.classList.remove("hidden");
        accordion.classList.add("open");
    }
}
function toggleServiceAccordion8(el) {
    const content = el.querySelector('.service-accordion-content');
    if (!content) return;

    content.classList.toggle('open');
}
document.addEventListener("click", function (e) {
    const details = e.target.closest("details");
    if (!details) return;

    // Prevent double toggle when clicking summary
    if (e.target.tagName.toLowerCase() === "summary") return;

    details.open = !details.open;
});
// Initialize Deck
updateSlide();