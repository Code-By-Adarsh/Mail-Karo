
  // Placeholder for future payment / backend integration
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("disabled")) return;
      console.log("Plan clicked");
    });
  });

  


  document.addEventListener("DOMContentLoaded", () => {
    const ctaButtons = document.querySelectorAll(".cta-button");
    const alertOverlay = document.getElementById("payment-alert");
    const closeIcon = document.getElementById("close-alert");

    if (!alertOverlay || !closeIcon) return;

    function openAlert() {
      alertOverlay.style.display = "flex";
      document.body.style.overflow = "hidden";
    }

    function closeAlert() {
      alertOverlay.style.display = "none";
      document.body.style.overflow = "";
    }

    // Open alert on CTA click
    ctaButtons.forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
        openAlert();
      });
    });

    // Close with ❌
    closeIcon.addEventListener("click", closeAlert);

    // Close when clicking outside the alert box
    alertOverlay.addEventListener("click", e => {
      if (e.target === alertOverlay) {
        closeAlert();
      }
    });

    // Close on ESC key
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && alertOverlay.style.display === "flex") {
        closeAlert();
      }
    });
  });





  