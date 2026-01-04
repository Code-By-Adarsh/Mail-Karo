document.addEventListener("DOMContentLoaded", () => {

  /* Fade-in blocks */
  const blocks = document.querySelectorAll(".mk-about-block");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mk-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    blocks.forEach(block => observer.observe(block));
  } else {
    blocks.forEach(block => block.classList.add("mk-visible"));
  }

  /* Yellow particles */
  addYellowParticles("#about-particle-area", 30);

  /* Footer year */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});

/* Particle function */
function addYellowParticles(selector, count = 30) {
  const target = document.querySelector(selector);
  if (!target || target.querySelector(".spark")) return;

  target.style.position = "relative";

  for (let i = 0; i < count; i++) {
    const spark = document.createElement("div");
    spark.className = "spark";
    spark.style.left = Math.random() * 100 + "%";
    spark.style.top = Math.random() * target.scrollHeight + "px";
    spark.style.animationDuration = 3 + Math.random() * 5 + "s";
    target.appendChild(spark);
  }
}
