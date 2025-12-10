// Footer social icons interaction
document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".social-icons img");

  // Hover animations for icons
  icons.forEach(icon => {
    icon.addEventListener("mouseenter", () => {
      icon.style.transition = "transform 0.3s ease, filter 0.3s ease";
      icon.style.transform = "translateY(-4px) scale(1.1)";
      icon.style.filter = "drop-shadow(0 0 10px rgba(255,215,0,0.6))";
    });
    icon.addEventListener("mouseleave", () => {
      icon.style.transform = "translateY(0) scale(1)";
      icon.style.filter = "none";
    });
  });
});
