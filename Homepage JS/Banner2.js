// Banner2.js

document.addEventListener("DOMContentLoaded", () => {
  const pdfBanner = document.querySelector(".mk-pdf-hero");
  if (!pdfBanner) return;

  // Generate spark dots
  for (let i = 0; i < 10; i++) {
    const spark = document.createElement("div");
    spark.classList.add("mk-pdf-spark");
    spark.style.left = Math.random() * 100 + "%";
    spark.style.top = Math.random() * 100 + "%";
    spark.style.animationDuration = 3 + Math.random() * 5 + "s";
    pdfBanner.appendChild(spark);
  }
});
