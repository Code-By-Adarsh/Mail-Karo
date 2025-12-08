// ===== PRIVACY POLICY PAGE INTERACTIONS =====
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for sidebar links
  document.querySelectorAll(".mk-privacy-sidebar a[href^='#']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Fade-in blocks on scroll
  const blocks = document.querySelectorAll(".mk-privacy-block");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mk-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    blocks.forEach((block) => observer.observe(block));
  } else {
    // Fallback: show all
    blocks.forEach((block) => block.classList.add("mk-visible"));
  }
});

// Set dynamic year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
