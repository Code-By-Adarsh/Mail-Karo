// Hero section animations and interactions
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const subtitle = document.querySelector(".hero-subtitle");
  const button = document.querySelector(".hero-btn");

  // Fade in subtitle and button
  setTimeout(() => {
    subtitle.style.opacity = "1";
    button.style.opacity = "1";
  }, 300);

  // Typewriter text effect
  const typeText = document.getElementById("typewriter-text");
  const phrases = [
    "Write Smarter.",
    "Mail Faster.",
    "Sound Professional.",
    "Save More Time."
  ];

  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];
    const speed = isDeleting ? 60 : 120;

    if (!isDeleting) {
      typeText.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;

      if (letterIndex === currentPhrase.length) {
        setTimeout(() => (isDeleting = true), 1000);
      }
    } else {
      typeText.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;

      if (letterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, speed);
  }

  typeLoop();

  // Animate logo
  const logo = document.querySelector(".mailkaro-logo");
  setTimeout(() => {
    logo.style.opacity = "1";
    logo.style.transform = "scale(1)";
  }, 400);

  // Glowing floating particles
  for (let i = 0; i < 10; i++) {
    const spark = document.createElement("div");
    spark.classList.add("spark");
    spark.style.left = Math.random() * 100 + "%";
    spark.style.top = Math.random() * 100 + "%";
    spark.style.animationDuration = 3 + Math.random() * 5 + "s";
    hero.appendChild(spark);
  }
});

// Spark CSS (unchanged)
const heroStyle = document.createElement("style");
heroStyle.innerHTML = `
.spark {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #FFD700;
  border-radius: 50%;
  opacity: 0.8;
  box-shadow: 0 0 8px #FFD700;
  animation: moveSpark linear infinite;
}
@keyframes moveSpark {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  50% { transform: translate(20px, -20px) scale(1.4); opacity: 0.6; }
  100% { transform: translate(0, 0) scale(1); opacity: 1; }
}
`;
document.head.appendChild(heroStyle);
