// Navbar functionality
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");
  const navbar = document.querySelector(".navbar");

  // Toggle mobile menu
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const bars = menuBtn.querySelectorAll(".bar");
    bars[0].classList.toggle("rotate1");
    bars[1].classList.toggle("fade");
    bars[2].classList.toggle("rotate2");
  });

  // Handle scroll effects
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.style.background = "var(--bg)";
      navbar.style.backdropFilter = "blur(8px)";
      navbar.style.padding = "12px 40px";
    } else {
      navbar.style.background = "var(--bg)";
      navbar.style.padding = "18px 40px";
    }
  });
});

// Hamburger animation styles
const style = document.createElement("style");
style.innerHTML = `
.bar.rotate1 { transform: translateY(7px) rotate(45deg); background-color: var(--accent); }
.bar.rotate2 { transform: translateY(-7px) rotate(-45deg); background-color: var(--accent); }
.bar.fade { opacity: 0; }
`;
document.head.appendChild(style);
