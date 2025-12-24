// Scroll-based animations and back-to-top button
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section, footer");
  const backToTop = document.getElementById("backToTop");

  // Fade-in animation for sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((sec) => {
    // Skip hero and testimonials sections (handled separately)
    if (!sec.classList.contains("mk-testimonials") && sec.id !== "home") {
      sec.classList.add("fade-in");
      observer.observe(sec);
    }
  });

  // Toggle back-to-top button visibility
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  // Smooth scroll to top
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
