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
// New! Solo Trap deep-dive modal
servicesData.push({
    title: "Why Late Hiring Fails",
    icon: "warning",
    desc: `
<p>Execution complexity grows faster than individual capacity.</p>
<p></p><br>
<ul class="list-disc pl-6 space-y-2">
  <li>Work becomes non-divisible due to system coupling</li>
  <li>Knowledge is undocumented and trapped in one head</li>
  <li>New hires create onboarding drag before output</li>
  <li>Bug surfaces expand faster than feature velocity</li>
  <li>Communication overhead replaces production time</li>
</ul>

<p class="mt-4">
If you add people too late, you don’t gain speed - you gain friction, burn, and rewrite risk.
</p>

<p class="font-bold mt-4">
Teams must form early so complexity grows alongside capacity, not against it.
</p>
`
});

// New! Psychometrics deep dive
servicesData.push({
    title: "Psychometrics",
    icon: "psychology",
    desc: `
<p><strong>Purpose:</strong> Predict execution compatibility before teams form.</p>

<ul class="list-disc pl-6 space-y-2">
  <li>How individuals approach complex problem-solving</li>
  <li>Risk tolerance and ability to operate under ambiguity</li>
  <li>Ownership mindset versus contribution preference</li>
  <li>Response to conflict, feedback, and iteration pressure</li>
  <li>Consistency, stamina, and behavior under deadlines</li>
</ul>

<p class="mt-4">
This is not personality typing.
</p>
<p class="mt-4">
It models execution fit using decision patterns and observed shipping behavior.
</p>
`
});


// New! Tech Vetting deep dive
servicesData.push({
    title: "Tech Vetting",
    icon: "code",
    desc: `
<p><strong>Purpose:</strong> Verify real-world technical execution, not resumes.</p>

<h4 class="font-bold mt-4">What we validate</h4>
<ul class="list-disc pl-6 space-y-2">
  <li>Hands-on technical testing (role-specific)</li>
  <li>Code or asset review on real production samples</li>
  <li>System-level thinking and debugging ability</li>
  <li>Pipeline awareness (builds, tooling, integration)</li>
</ul>

<h4 class="font-bold mt-4">Endorsements</h4>
<ul class="list-disc pl-6 space-y-2">
  <li>Peer endorsements from verified shippers</li>
  <li>Cross-role validation (e.g. designer ↔ engineer)</li>
</ul>

<h4 class="font-bold mt-4">Team Leader Interview</h4>
<p>
Short structured interview focused on decision-making, tradeoffs, and execution ownership.
</p>
`
});

// New! Track Record deep dive
servicesData.push({
    title: "Track Record",
    icon: "history",
    desc: `
<p><strong>Purpose:</strong> Ground trust in shipped reality.</p>

<ul class="list-disc pl-6 space-y-2">
  <li>Shipped games (links to Steam, console, mobile)</li>
  <li>Role on each project (not just credits)</li>
  <li>Companies or studios worked in</li>
  <li>Total years of relevant experience</li>
  <li>Team size and production scope</li>
</ul>

<h4 class="font-bold mt-4">Reputation Signals</h4>
<ul class="list-disc pl-6 space-y-2">
  <li>Endorsements from former teammates</li>
  <li>Repeat collaboration history</li>
  <li>Survivorship across multiple projects</li>
</ul>
`
});

// Initialize Deck
updateSlide();