// Clean Contact Us JS - no loading animation, proper error display

const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  subject: document.getElementById("subject"),
  message: document.getElementById("message")
};

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const successModal = document.getElementById("successModal");

let hasAttemptedSubmit = false; // Track if user has tried to submit

// ANIMATION TRIGGER
function triggerAnimations() {
  const animatedElements = document.querySelectorAll("[data-animate]");
  animatedElements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("show");
    }, i * 150);
  });
}

// Trigger animations when page loads
window.addEventListener("DOMContentLoaded", () => {
  triggerAnimations();
  document.getElementById("year").textContent = new Date().getFullYear();
});

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(input, msg) {
  const group = input.parentElement;
  group.classList.add("error");
  const note = group.querySelector(".input-error");
  if (note) note.textContent = msg;
}

function clearError(input) {
  const group = input.parentElement;
  group.classList.remove("error");
}

function validateField(id, showErrors = false) {
  const input = fields[id];
  const val = input.value.trim();

  if (!val) {
    if (showErrors) {
      showError(input, "This field is required");
    }
    return false;
  }

  if (id === "email" && !validEmail(val)) {
    if (showErrors) {
      showError(input, "Enter a valid email");
    }
    return false;
  }

  clearError(input);
  return true;
}

function updateSubmit() {
  // Check if all fields are valid (but don't show errors)
  const ok = validateField("name", false) &&
             validateField("email", false) &&
             validateField("subject", false) &&
             validateField("message", false);
  submitBtn.disabled = !ok;
}

// Only clear errors and check validity while typing
Object.keys(fields).forEach(id => {
  fields[id].addEventListener("input", () => {
    // Only validate and show errors if user has already tried to submit
    if (hasAttemptedSubmit) {
      validateField(id, true);
    } else {
      // Just clear errors if they exist
      clearError(fields[id]);
    }
    updateSubmit();
  });
  
  // Special handling for email - show format errors on blur
  if (id === "email") {
    fields[id].addEventListener("blur", () => {
      const val = fields[id].value.trim();
      if (val && !validEmail(val)) {
        showError(fields[id], "Enter a valid email");
      }
    });
  }
});

// Simulated send
function simulateSend() {
  return new Promise(res => setTimeout(() => res({ ok: true }), 500));
}

function showSuccessModal() {
  successModal.classList.add("show");
  successModal.setAttribute("aria-hidden", "false");
  setTimeout(() => closeSuccessModal(), 2500);
}

function closeSuccessModal() {
  successModal.classList.remove("show");
  successModal.setAttribute("aria-hidden", "true");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  hasAttemptedSubmit = true; // Mark that user tried to submit
  
  // Validate all fields and show errors
  const nameValid = validateField("name", true);
  const emailValid = validateField("email", true);
  const subjectValid = validateField("subject", true);
  const messageValid = validateField("message", true);
  
  // If any field is invalid, stop submission
  if (!nameValid || !emailValid || !subjectValid || !messageValid) {
    console.log("Validation failed - errors should be visible now");
    return;
  }

  // Disable button during submission
  submitBtn.disabled = true;
  submitBtn.querySelector(".btn-text").textContent = "Submitted ✓";

  try {
    const res = await simulateSend();

    if (res.ok) {
      showSuccessModal();

      setTimeout(() => {
        Object.values(fields).forEach(f => f.value = "");
        Object.values(fields).forEach(f => clearError(f));
        submitBtn.disabled = false;
        submitBtn.querySelector(".btn-text").textContent = "Submit";
        hasAttemptedSubmit = false; // Reset for next submission
        updateSubmit();
      }, 900);
    } else {
      throw new Error("send failed");
    }
  } catch (err) {
    submitBtn.disabled = false;
    submitBtn.querySelector(".btn-text").textContent = "Submit";
    const toast = document.getElementById("formToast");
    toast.textContent = "Something went wrong. Try again.";
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);
  }
});

updateSubmit();