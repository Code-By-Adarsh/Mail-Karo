document.addEventListener("DOMContentLoaded", () => {
  // 🔒 Scope JS strictly to Pricing section
  const pricingSection = document.getElementById("pricing");
  if (!pricingSection) return;

  // 🎯 Only pricing CTA buttons
  const pricingCtas = pricingSection.querySelectorAll(".pricing-cta");

  // 🧾 Alert elements
  const alertOverlay = document.getElementById("payment-alert");
  const closeIcon = document.getElementById("close-alert");

  // Safety check
  if (!alertOverlay || !closeIcon || pricingCtas.length === 0) return;

  // 🔓 Open alert
  function openAlert() {
    alertOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  // 🔒 Close alert
  function closeAlert() {
    alertOverlay.style.display = "none";
    document.body.style.overflow = "";
  }

  // 🚀 Attach click only to pricing buttons
  pricingCtas.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openAlert();
    });
  });

  // ❌ Close icon
  closeIcon.addEventListener("click", closeAlert);

  // 🖱️ Click outside modal closes it
  alertOverlay.addEventListener("click", (e) => {
    if (e.target === alertOverlay) {
      closeAlert();
    }
  });

  // ⌨️ ESC key closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && alertOverlay.style.display === "flex") {
      closeAlert();
    }
  });
});
