// ===== SLIDE SOURCES =====
const slides = [
  "assets/deck/slides/slide-01.html",
  "assets/deck/slides/slide-02.html",
  "assets/deck/slides/slide-03.html",
  "assets/deck/slides/slide-04.html",
  "assets/deck/slides/slide-05.html",
  "assets/deck/slides/slide-06.html",
  "assets/deck/slides/slide-07.html",
  "assets/deck/slides/slide-08.html",
  "assets/deck/slides/slide-09.html",
  "assets/deck/slides/slide-10.html",
  "assets/deck/slides/slide-11.html"
];

// ===== STATE =====
let index = 0;

// ===== ELEMENTS =====
const container = document.getElementById("slideContainer");
const counter = document.getElementById("counter");
const progress = document.getElementById("progressBar");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

// ===== LOAD SLIDE =====
function loadSlide() {
  fetch(slides[index])
    .then(r => {
      if (!r.ok) throw new Error("Slide load failed");
      return r.text();
    })
    .then(html => {
      container.innerHTML = html;

      counter.textContent =
        String(index + 1).padStart(2, "0") +
        " / " +
        String(slides.length).padStart(2, "0");

      progress.style.width =
        ((index + 1) / slides.length) * 100 + "%";
    });
}

// ===== NAV BUTTONS =====
nextBtn.addEventListener("click", () => {
  if (index < slides.length - 1) {
    index++;
    loadSlide();
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    loadSlide();
  }
});

// ===== KEYBOARD =====
document.addEventListener("keydown", e => {
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "ArrowLeft") prevBtn.click();
});

// ===== INIT =====
loadSlide();
