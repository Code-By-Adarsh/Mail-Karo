
  // Placeholder for future payment / backend integration
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("disabled")) return;
      console.log("Plan clicked");
    });
  });
