// Banner 1 functionality

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.querySelector(".mk-hero");
  if (!banner) return;

  // Create glowing particles
  for (let i = 0; i < 10; i++) {
    const spark = document.createElement("div");
    spark.classList.add("mk-spark");
    spark.style.left = Math.random() * 100 + "%";
    spark.style.top = Math.random() * 100 + "%";
    spark.style.animationDuration = 3 + Math.random() * 5 + "s";
    banner.appendChild(spark);
  }
});

// Inject spark CSS
const bannerSparkStyle = document.createElement("style");
bannerSparkStyle.innerHTML = `
.mk-spark {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #FFD700;
  border-radius: 50%;
  opacity: 0.85;
  box-shadow: 0 0 10px #FFD700;
  animation: mkMoveSpark linear infinite;
  z-index: 1;
}

@keyframes mkMoveSpark {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  50% { transform: translate(22px, -22px) scale(1.3); opacity: 0.55; }
  100% { transform: translate(0, 0) scale(1); opacity: 1; }
}
`;
document.head.appendChild(bannerSparkStyle);
