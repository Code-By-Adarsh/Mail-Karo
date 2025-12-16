// Banner 2 functionality

document.addEventListener("DOMContentLoaded", () => {
  const pdfBanner = document.querySelector(".mk-pdf-hero");
  if (!pdfBanner) return;

  // Generate spark effects
  for (let i = 0; i < 10; i++) {
    const spark = document.createElement("div");
    spark.classList.add("mk-pdf-spark");
    spark.style.left = Math.random() * 100 + "%";
    spark.style.top = Math.random() * 100 + "%";
    spark.style.animationDuration = 3 + Math.random() * 5 + "s";
    pdfBanner.appendChild(spark);
  }
});

// Inject spark CSS
const banner2SparkStyle = document.createElement("style");
banner2SparkStyle.innerHTML = `
.mk-pdf-spark {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #FFD700;
  border-radius: 50%;
  opacity: 0.85;
  box-shadow: 0 0 10px #FFD700;
  animation: mkMoveSparkPdf linear infinite;
  z-index: 1;
}

@keyframes mkMoveSparkPdf {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  50% { transform: translate(22px, -22px) scale(1.3); opacity: 0.55; }
  100% { transform: translate(0, 0) scale(1); opacity: 1; }
}
`;
document.head.appendChild(banner2SparkStyle);
