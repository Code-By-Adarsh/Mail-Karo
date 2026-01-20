// ==============================
// ✅ Mail Karo Robot Assistant JS
// Independent (no API)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("mkRobotBtn");
  const panel = document.getElementById("mkRobotPanel");
  const closeBtn = document.getElementById("mkRobotClose");
  const body = document.getElementById("mkRobotBody");
  const needHelpBtn = document.getElementById("mkRobotNeedHelp");

  const form = document.getElementById("mkRobotForm");
  const titleInput = document.getElementById("mkRobotTitle");
  const descInput = document.getElementById("mkRobotDesc");
  const emailInput = document.getElementById("mkRobotEmail");

  function openPanel() {
    panel.style.display = "flex";
    panel.setAttribute("aria-hidden", "false");
  }

  function closePanel() {
    panel.style.display = "none";
    panel.setAttribute("aria-hidden", "true");
  }

  btn.addEventListener("click", () => {
    if (panel.style.display === "block") closePanel();
    else openPanel();
  });

  closeBtn.addEventListener("click", closePanel);

  // close panel on outside click
  document.addEventListener("click", (e) => {
    if (!panel.contains(e.target) && !btn.contains(e.target)) {
      closePanel();
    }
  });

  function botReply(text) {
    const div = document.createElement("div");
    div.className = "mk-msg mk-bot";
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  // chip actions
  document.querySelectorAll(".mk-robot-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      const topic = chip.dataset.topic;

      if (topic === "otp") {
        botReply("✅ OTP not coming? Try: Refresh inbox → wait 1–2 min → check spam → resend OTP.");
        botReply("If still not solved, click “Still need help?” and send details.");
      }

      if (topic === "inbox") {
        botReply("📩 Inbox issue? Try: Reload page → generate new inbox → check internet → try different browser.");
        botReply("If emails still not receiving, send us the sender app/site name.");
      }

      if (topic === "pricing") {
        botReply("💎 Pricing: Free plan is available. Pro unlocks better limits & features.");
        botReply("If you want custom pricing, you can contact support.");
      }

      if (topic === "bug") {
        botReply("🐞 Bug reporting tip: send steps to reproduce + expected vs actual + screenshot (optional).");
        botReply("Click “Still need help?” → send bug details.");
      }
    });
  });

  // show contact form
  needHelpBtn.addEventListener("click", () => {
    form.style.display = "flex";
    needHelpBtn.style.display = "none";
    botReply("✍️ Okay, send your issue. We’ll contact you soon.");
  });

  // Submit form (Frontend only placeholder)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const payload = {
      title: titleInput.value.trim(),
      description: descInput.value.trim(),
      email: emailInput.value.trim(),
      page: window.location.href,
      time: new Date().toISOString()
    };

    // ✅ for now: console log (later you will connect backend/email)
    console.log("MailKaro Support Request:", payload);

    botReply("✅ Sent! Our support will review your issue.");
    form.reset();

    // optional close after submit
    setTimeout(() => {
      closePanel();
      form.style.display = "none";
      needHelpBtn.style.display = "inline-flex";
    }, 1200);
  });
});
