// scroll.js

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section, footer");
  const backToTop = document.getElementById("backToTop");

  // Intersection Observer for fade-in animation
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
    // Exclude Testimonials section (handled by testinomial.js)
    if (!sec.classList.contains("mk-testimonials")) {
      sec.classList.add("fade-in");
      observer.observe(sec);
    }
  });

  // Back to Top Button visibility toggle
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
