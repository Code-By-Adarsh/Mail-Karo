// final prompt.js (Ultra-Pro Wizard — 15 templates)
document.addEventListener("DOMContentLoaded", () => {
  // ---------- DOM refs (guarded) ----------
  const $ = id => document.getElementById(id);
  const generateBtn = $("generateBtn");
  const promptInput = $("promptInput");
  const outputText = $("outputText");
  const copyBtn = $("copyBtn");
  const resetBtn = $("resetBtn");
  const regenerateBtn = $("regenerateBtn");
  const toneSelect = $("toneSelect");
  const lengthSelect = $("lengthSelect");


  const templateSelect = $("templateSelect");
  const saveTemplateBtn = $("saveTemplateBtn");
  const savedGroup = $("savedTemplatesGroup");

  const openWizardBtn = $("openWizardBtn");
  const wizardModal = $("wizardModal");
  const closeWizardBtn = $("closeWizardBtn");
  const wizardStepWrap = $("wizardStepWrap");
  const wizardBackBtn = $("wizardBackBtn");
  const wizardNextBtn = $("wizardNextBtn");
  const wizardFinishBtn = $("wizardFinishBtn");
  const wizardProgressText = $("wizardProgressText");

  // if essential elements missing, log and abort gracefully
  if (!generateBtn || !promptInput || !outputText) {
    console.error("Essential prompt elements missing. Aborting prompt.js init.");
    return;
  }

  // ---------- state ----------
  let lastPrompt = "";
  let lastTone = "";

  generateBtn.innerText = "⚡ Generate";

  // ---------- template skeletons (with placeholders) ----------
  const templateSkeletons = {
    job:
      "Hello {{recipientName}},\n\nI am writing to apply for the {{position}} position at {{company}}. My key highlights: {{resumeHighlights}}.\nWhy I'm a fit: {{whyFit}}.\n\nSincerely,\n{{senderName}}",
    complaint:
      "Hello {{recipientName}},\n\nI'm reaching out about an issue with {{product}}: {{issue}}. This began on {{when}} and it's causing {{impact}}. Example: {{example}}.\n\nPlease advise next steps.\n\nRegards,\n{{senderName}}",
    followup:
      "Hello {{recipientName}},\n\nFollowing up on {{previousTopic}} (discussion on {{dateOfDiscussion}}). I'm looking for {{whatYouNeed}}.\n\nThanks,\n{{senderName}}",
    leave:
      "Hello {{recipientName}},\n\nI request leave from {{startDate}} to {{endDate}} due to {{reason}}. Handover: {{workHandover}}.\n\nThank you,\n{{senderName}}",
    apology:
      "Hi {{recipientName}},\n\nI apologize for {{whatHappened}}. Cause: {{yourMistakeCause}}. I will fix it by {{howYouWillFixIt}}.\n\nSincerely,\n{{senderName}}",
    meeting:
      "Hello {{recipientName}},\n\nI'd like to schedule a meeting about {{meetingTopic}}. Preferred dates: {{preferredDates}}. Agenda: {{agendaPoints}}.\n\nRegards,\n{{senderName}}",
    offer:
      "Hello {{recipientName}},\n\nI am pleased to accept the offer for {{role}} at {{company}}. My proposed joining date is {{joiningDate}}.\n\nBest,\n{{senderName}}",
    resignation:
      "Dear {{recipientName}},\n\nPlease accept this as my resignation from {{role}} effective {{noticePeriodEnd}}. Reason (optional): {{reason}}. Handover plan: {{handoverPlan}}.\n\nRegards,\n{{senderName}}",
    reminder:
      "Hello {{recipientName}},\n\nThis is a friendly reminder about {{task}} due on {{dueDate}}. Reason: {{importanceReason}}.\n\nThanks,\n{{senderName}}",
    support:
      "Hi {{recipientName}},\n\nI'm facing an issue with {{product}}: {{issue}}. Error/details: {{errorDetails}}. Steps tried: {{stepsTried}}.\n\nPlease assist.\n\nRegards,\n{{senderName}}",
    refund:
      "Hello {{recipientName}},\n\nI request a refund for {{item}} purchased on {{purchaseDate}} (Order: {{orderId}}) due to {{reasonForRefund}}.\n\nThanks,\n{{senderName}}",
    thanks:
      "Hello {{recipientName}},\n\nThank you for {{reason}} — especially {{specificInstance}}. It helped by {{impact}}.\n\nWarmly,\n{{senderName}}",
    inquiry:
      "Hello {{recipientName}},\n\nI have questions about {{topic}}: {{yourQuestions}}. This is {{urgencyLevel}}.\n\nRegards,\n{{senderName}}",
    marketing:
      "Hi {{recipientName}},\n\nIntroducing {{product}} — {{oneLinePitch}}. Top benefits: {{topBenefits}}. CTA: {{ctaAction}}.\n\nCheers,\n{{senderName}}",
    feedback:
      "Hello {{recipientName}},\n\nFeedback on {{topic}}:\nWhat worked: {{positives}}\nCould improve: {{improvements}}\nSeverity: {{severity}}\n\nThanks,\n{{senderName}}"
  };

  // ---------- fields per template (complete 15) ----------
  const templateFields = {
    job: [
      { key: "recipientName", label: "Recipient name" },
      { key: "position", label: "Position you're applying for" },
      { key: "company", label: "Company name" },
      { key: "resumeHighlights", label: "Resume highlights (1–2 lines)" },
      { key: "whyFit", label: "Why you're a fit (1–2 lines)" },
      { key: "senderName", label: "Your full name" }
    ],
    complaint: [
      { key: "recipientName", label: "Recipient name / Team" },
      { key: "product", label: "Product / Service name" },
      { key: "issue", label: "Describe the issue (short)" },
      { key: "when", label: "When it started" },
      { key: "impact", label: "Impact or inconvenience" },
      { key: "example", label: "Concise example / screenshot note" },
      { key: "senderName", label: "Your name" }
    ],
    followup: [
      { key: "recipientName", label: "Recipient name" },
      { key: "previousTopic", label: "Previous topic / meeting" },
      { key: "dateOfDiscussion", label: "Date of discussion" },
      { key: "whatYouNeed", label: "What you're requesting now" },
      { key: "senderName", label: "Your name" }
    ],
    leave: [
      { key: "recipientName", label: "Recipient name (Manager)" },
      { key: "startDate", label: "Leave start date" },
      { key: "endDate", label: "Leave end date" },
      { key: "reason", label: "Reason for leave" },
      { key: "workHandover", label: "Work handover (tasks/colleague)" },
      { key: "senderName", label: "Your name" }
    ],
    apology: [
      { key: "recipientName", label: "Recipient name" },
      { key: "whatHappened", label: "What happened" },
      { key: "yourMistakeCause", label: "Cause or reason (brief)" },
      { key: "howYouWillFixIt", label: "How you'll fix / next steps" },
      { key: "senderName", label: "Your name" }
    ],
    meeting: [
      { key: "recipientName", label: "Recipient name" },
      { key: "meetingTopic", label: "Meeting topic" },
      { key: "preferredDates", label: "Preferred dates / times" },
      { key: "agendaPoints", label: "Agenda points (short)" },
      { key: "senderName", label: "Your name" }
    ],
    offer: [
      { key: "recipientName", label: "Recipient name / HR" },
      { key: "role", label: "Offered role" },
      { key: "company", label: "Company name" },
      { key: "joiningDate", label: "Proposed joining date" },
      { key: "senderName", label: "Your name" }
    ],
    resignation: [
      { key: "recipientName", label: "Recipient name (Manager/HR)" },
      { key: "role", label: "Your current role" },
      { key: "noticePeriodEnd", label: "Last working day / notice end" },
      { key: "reason", label: "Reason (optional)" },
      { key: "handoverPlan", label: "Handover plan (short)" },
      { key: "senderName", label: "Your name" }
    ],
    reminder: [
      { key: "recipientName", label: "Recipient name" },
      { key: "task", label: "Task / deliverable" },
      { key: "dueDate", label: "Due date" },
      { key: "importanceReason", label: "Why it's important (short)" },
      { key: "senderName", label: "Your name" }
    ],
    support: [
      { key: "recipientName", label: "Support team / contact" },
      { key: "product", label: "Product / service" },
      { key: "issue", label: "Short issue summary" },
      { key: "errorDetails", label: "Error details / codes" },
      { key: "stepsTried", label: "Steps you've tried" },
      { key: "senderName", label: "Your name" }
    ],
    refund: [
      { key: "recipientName", label: "Recipient name / Support" },
      { key: "item", label: "Item / product" },
      { key: "purchaseDate", label: "Purchase date" },
      { key: "orderId", label: "Order / invoice ID" },
      { key: "reasonForRefund", label: "Reason for refund" },
      { key: "senderName", label: "Your name" }
    ],
    thanks: [
      { key: "recipientName", label: "Recipient name" },
      { key: "reason", label: "Reason for thanks" },
      { key: "specificInstance", label: "Specific instance (what they did)" },
      { key: "impact", label: "How it helped you" },
      { key: "senderName", label: "Your name" }
    ],
    inquiry: [
      { key: "recipientName", label: "Recipient name / Dept" },
      { key: "topic", label: "Topic of inquiry" },
      { key: "yourQuestions", label: "Your specific questions" },
      { key: "urgencyLevel", label: "Urgency (low/medium/high)" },
      { key: "senderName", label: "Your name" }
    ],
    marketing: [
      { key: "recipientName", label: "Recipient name / Segment" },
      { key: "product", label: "Product name" },
      { key: "oneLinePitch", label: "One-line pitch" },
      { key: "topBenefits", label: "Top benefits (comma separated)" },
      { key: "ctaAction", label: "Call-to-action (what to do)" },
      { key: "senderName", label: "Your name" }
    ],
    feedback: [
      { key: "recipientName", label: "Recipient name / Team" },
      { key: "topic", label: "Topic / product" },
      { key: "positives", label: "What worked well" },
      { key: "improvements", label: "What to improve" },
      { key: "severity", label: "Severity (low/medium/high)" },
      { key: "senderName", label: "Your name" }
    ]
  };

  // utility: chunk array into steps (n fields per step)
  const chunk = (arr, size) => {
    const out = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  };

  // ---------- Saved templates loader ----------
  function loadSavedTemplates() {
    if (!savedGroup) return;
    savedGroup.innerHTML = "";
    const saved = JSON.parse(localStorage.getItem("mailKaroSavedTemplates") || "[]");
    saved.forEach((t, i) => {
      const option = document.createElement("option");
      option.value = `saved_${i}`;
      option.textContent = `⭐ ${t.name}`;
      option.dataset.content = t.content;
      savedGroup.appendChild(option);
    });
  }
  loadSavedTemplates();

  // templateSelect behavior
  if (templateSelect) {
    templateSelect.addEventListener("change", () => {
      const val = templateSelect.value || "";
      if (val.startsWith("saved_")) {
        const opt = templateSelect.options[templateSelect.selectedIndex];
        promptInput.value = (opt && opt.dataset && opt.dataset.content) || "";
      } else if (templateSkeletons[val]) {
        promptInput.value = templateSkeletons[val];
      } else {
        promptInput.value = "";
      }
      promptInput.dispatchEvent(new Event("input"));
    });
  }

  // save template
  if (saveTemplateBtn) {
    saveTemplateBtn.addEventListener("click", () => {
      const text = promptInput.value.trim();
      if (!text) {
        saveTemplateBtn.innerText = "⚠ Write something";
        setTimeout(() => (saveTemplateBtn.innerText = "💾 Save Template"), 1200);
        return;
      }
      const name = prompt("Template name?");
      if (!name) return;
      const saved = JSON.parse(localStorage.getItem("mailKaroSavedTemplates") || "[]");
      saved.push({ name, content: text });
      localStorage.setItem("mailKaroSavedTemplates", JSON.stringify(saved));
      loadSavedTemplates();
      saveTemplateBtn.innerText = "✓ Saved!";
      setTimeout(() => (saveTemplateBtn.innerText = "💾 Save Template"), 1000);
    });
  }

  // counter
  const charCount = $("charCount");
  const wordCount = $("wordCount");
  promptInput.addEventListener("input", () => {
    if (charCount) charCount.innerText = `${promptInput.value.length} chars`;
    if (wordCount) wordCount.innerText = `${promptInput.value.trim().split(/\s+/).filter(Boolean).length} words`;
    promptInput.style.height = "auto";
    promptInput.style.height = promptInput.scrollHeight + "px";
    generateBtn.innerText = "⚡ Generate";
  });

  /* =============================
   MOBILE TEXTAREA AUTO-RESIZE FIX
============================= */
function autoResize() {
  promptInput.style.height = "auto";
  promptInput.style.height = promptInput.scrollHeight + "px";
}

// Normal desktop + android fix
promptInput.addEventListener("input", autoResize);

// Mobile Safari fix – force update every few ms while typing
let lastVal = "";
setInterval(() => {
  if (promptInput.value !== lastVal) {
    lastVal = promptInput.value;
    autoResize();
  }
}, 200);

  // enable/disable
  function disableAll() {
    const els = [generateBtn, regenerateBtn, promptInput, toneSelect, lengthSelect, templateSelect, copyBtn, resetBtn, saveTemplateBtn, openWizardBtn];
    els.forEach(el => { if (el) el.disabled = true; });
    if (generateBtn) generateBtn.style.cursor = "not-allowed";
  }
  function enableAll() {
    const els = [generateBtn, regenerateBtn, promptInput, toneSelect, lengthSelect, templateSelect, copyBtn, resetBtn, saveTemplateBtn, openWizardBtn];
    els.forEach(el => { if (el) el.disabled = false; });
    if (generateBtn) generateBtn.style.cursor = "pointer";
  }

  // generate function
  async function generateEmail(customPrompt = null, customTone = null) {
    const userPrompt = (customPrompt !== null && customPrompt !== undefined) ? customPrompt : promptInput.value.trim();
    const tone = customTone || (toneSelect ? toneSelect.value : "formal");

    lastPrompt = userPrompt;
    lastTone = tone;

    if (!userPrompt) {
      if (outputText) outputText.innerText = "⚠️ Please enter a prompt!";
      return;
    }

    // Length instruction
let lengthInstruction = "";
if (lengthSelect) {
  if (lengthSelect.value === "small") lengthInstruction = " Keep the email around 100 to 150 words.";
  if (lengthSelect.value === "medium") lengthInstruction = " Keep the email around 150 to 200 words.";
  if (lengthSelect.value === "large") lengthInstruction = " Keep the email around 200 to 250 words.";
}

const finalPrompt = `${userPrompt}. Write this in a ${tone} tone.${lengthInstruction}`;


    disableAll();
    if (generateBtn) generateBtn.innerText = "🔄 Generating…";
    if (outputText) {
      outputText.innerHTML = `<span class="email-spinner"></span> Generating email...`;
      outputText.classList.add("loading");
    }

    try {
      const res = await fetch("https://mail-karo.onrender.com/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: finalPrompt })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      if (outputText) {
        outputText.classList.remove("loading");
        outputText.innerText = data.email;
      }
      if (generateBtn) generateBtn.innerText = "🌟 Generated!";
    } catch (err) {
      if (outputText) {
        outputText.classList.remove("loading");
        outputText.innerText = "⚠️ " + (err.message || "Unknown error");
      }
      if (generateBtn) generateBtn.innerText = "❌ Try Again";
      console.error(err);
    } finally {
      enableAll();
    }
  }

  if (generateBtn) generateBtn.addEventListener("click", () => generateEmail());
  if (regenerateBtn) regenerateBtn.addEventListener("click", () => { if (lastPrompt) generateEmail(lastPrompt, lastTone); });
  if (copyBtn) copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(outputText.innerText || "");
    copyBtn.innerText = "✓ Copied";
    setTimeout(() => (copyBtn.innerText = "📋 Copy"), 1200);
  });
  if (resetBtn) resetBtn.addEventListener("click", () => {
    promptInput.value = "";
    if (outputText) outputText.innerText = "Your AI-generated email will appear here...";
    if (charCount) charCount.innerText = "0 chars";
    if (wordCount) wordCount.innerText = "0 words";
    promptInput.style.height = "50px";
  });

  // ---------- WIZARD (Option-C Ultra) ----------
  // We'll group fields into steps (maxFieldsPerStep). Each step shows multiple fields (grid).
  const maxFieldsPerStep = 4; // shows up to 4 fields per step (2-column on wide screens)
  let wizardState = {
    templateKey: null,
    steps: [], // array of arrays of field objects
    stepIndex: 0,
    answers: {} // key -> value
  };

  // helper to open wizard: builds steps from templateFields
  function openWizard() {
    if (!openWizardBtn) return;
    const key = templateSelect ? templateSelect.value : null;
    if (!key || !templateFields[key]) {
      alert("Wizard is not available for this template yet. Please choose a template that supports the wizard.");
      return;
    }

    const fields = templateFields[key] || [];
    const grouped = chunk(fields, maxFieldsPerStep);
    wizardState.templateKey = key;
    wizardState.steps = grouped;
    wizardState.stepIndex = 0;
    wizardState.answers = {}; // reset

    renderWizardStep();
    if (wizardModal) wizardModal.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
  }

  // render current step (multiple fields)
  function renderWizardStep() {
    if (!wizardStepWrap) return;
    wizardStepWrap.innerHTML = "";
    const steps = wizardState.steps;
    const idx = wizardState.stepIndex;
    if (!steps || !steps[idx]) return;

    const stepFields = steps[idx];

    // progress text
    if (wizardProgressText) wizardProgressText.innerText = `Step ${idx + 1} of ${steps.length}`;

    // grid container (responsive)
    const grid = document.createElement("div");
    grid.className = "wizard-grid";
    // Use inline grid style so no extra CSS file needed:
    const cols = window.innerWidth > 680 ? 2 : 1; // 2 columns on wider screens
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    grid.style.gap = "12px";

    // Create inputs for each field in this step
    stepFields.forEach(field => {
      const wrap = document.createElement("div");
      wrap.className = "wizard-field";

      const label = document.createElement("label");
      label.innerText = field.label;
      wrap.appendChild(label);

      // Choose textarea for long prompts by heuristic (keywords)
      const longKeys = ["highlights","why","example","reason","details","questions","agenda","steps","improvements","positives","topBenefits","yourQuestions","resumeHighlights","whatHappened","howYouWillFixIt","errorDetails"];
      const isLong = longKeys.some(k => field.key.toLowerCase().includes(k));

      let inputEl;
      if (isLong) {
        inputEl = document.createElement("textarea");
        inputEl.rows = 3;
      } else {
        inputEl = document.createElement("input");
        inputEl.type = "text";
      }
      inputEl.id = `wiz_${field.key}`;
      inputEl.value = wizardState.answers[field.key] || "";
      inputEl.placeholder = field.placeholder || "";

      // accessibility
      inputEl.setAttribute("aria-label", field.label);

      // simple Enter behavior: if input is not textarea, Enter moves to next input / step
      inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && inputEl.tagName !== "TEXTAREA") {
          e.preventDefault();
          focusNextFieldOrAdvance();
        }
      });

      wrap.appendChild(inputEl);

      // optional note (if provided)
      if (field.optional) {
        const note = document.createElement("div");
        note.className = "wizard-note";
        note.innerText = "(optional)";
        wrap.appendChild(note);
      }

      grid.appendChild(wrap);
    });

    wizardStepWrap.appendChild(grid);

    // Buttons state
    if (wizardBackBtn) wizardBackBtn.disabled = idx === 0;
    if (wizardNextBtn) wizardNextBtn.style.display = idx < steps.length - 1 ? "inline-flex" : "none";
    if (wizardFinishBtn) wizardFinishBtn.style.display = idx === steps.length - 1 ? "inline-flex" : "none";

    // focus first input
    const firstInput = wizardStepWrap.querySelector("input, textarea");
    if (firstInput) setTimeout(() => firstInput.focus(), 50);
  }

  // helper: focus next input in step or advance
  function focusNextFieldOrAdvance() {
    const inputs = Array.from(wizardStepWrap.querySelectorAll("input, textarea"));
    const active = document.activeElement;
    const idx = inputs.indexOf(active);
    if (idx >= 0 && idx < inputs.length - 1) {
      inputs[idx + 1].focus();
    } else {
      // at end -> save and advance
      saveCurrentStep();
      if (wizardState.stepIndex < wizardState.steps.length - 1) {
        wizardState.stepIndex++;
        renderWizardStep();
      } else {
        finishWizard();
      }
    }
  }

  // save values for current step fields
  function saveCurrentStep() {
    const stepFields = wizardState.steps[wizardState.stepIndex] || [];
    stepFields.forEach(f => {
      const el = document.getElementById(`wiz_${f.key}`);
      if (el) wizardState.answers[f.key] = el.value.trim();
    });
  }

  // navigation
  if (wizardNextBtn) wizardNextBtn.addEventListener("click", () => {
    saveCurrentStep();
    if (wizardState.stepIndex < wizardState.steps.length - 1) {
      wizardState.stepIndex++;
      renderWizardStep();
    }
  });
  if (wizardBackBtn) wizardBackBtn.addEventListener("click", () => {
    saveCurrentStep();
    if (wizardState.stepIndex > 0) {
      wizardState.stepIndex--;
      renderWizardStep();
    }
  });

  // finish -> build final skeleton and inject into textarea
  function finishWizard() {
    saveCurrentStep();
    const key = wizardState.templateKey;
    if (!key) return closeWizardSafely();
    let final = templateSkeletons[key] || "";
    // replace all placeholders (global)
    Object.entries(wizardState.answers).forEach(([k, v]) => {
      const re = new RegExp(`{{\\s*${k}\\s*}}`, "g");
      final = final.replace(re, v || "");
    });
    // remove any leftover placeholders gracefully
    final = final.replace(/{{\s*[\w]+\s*}}/g, "").replace(/\n{3,}/g, "\n\n").trim();

    promptInput.value = final;
    promptInput.dispatchEvent(new Event("input"));
    closeWizardSafely();
  }

  if (wizardFinishBtn) wizardFinishBtn.addEventListener("click", finishWizard);

  // open/close handlers
  if (openWizardBtn) openWizardBtn.addEventListener("click", () => {
    // before open, ensure template exists and has fields
    const key = templateSelect ? templateSelect.value : null;
    if (!key || !templateFields[key]) {
      alert("Wizard is available only for built-in templates. Please select one of the templates (e.g., Complaint, Job, Follow-Up).");
      return;
    }
    openWizard();
  });
  if (closeWizardBtn) closeWizardBtn.addEventListener("click", closeWizardSafely);
  if (wizardModal) wizardModal.addEventListener("click", (e) => { if (e.target === wizardModal) closeWizardSafely(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && wizardModal && wizardModal.getAttribute("aria-hidden")==="false") closeWizardSafely(); });

  function closeWizardSafely() {
    if (wizardModal) wizardModal.setAttribute("aria-hidden", "true");
    wizardStepWrap && (wizardStepWrap.innerHTML = "");
    wizardState = { templateKey: null, steps: [], stepIndex: 0, answers: {} };
    document.documentElement.style.overflow = "";
  }

  // ---------- helper to finish if template changed mid-wizard ----------
  // optional: if user changes template while wizard open, we close wizard
  if (templateSelect) templateSelect.addEventListener("change", () => {
    if (wizardModal && wizardModal.getAttribute("aria-hidden")==="false") {
      closeWizardSafely();
    }
  });

  // ---------- spinner style (unique var) ----------
  const spinnerStyleFinal = document.createElement("style");
  spinnerStyleFinal.id = "spinnerStyleFinal";
  spinnerStyleFinal.innerHTML = `
  .email-spinner {
    width:16px;height:16px;
    border:2px solid rgba(255,255,255,0.3);
    border-top-color:#fff;
    border-radius:50%;
    animation:spin 1s linear infinite;
    display:inline-block;
    margin-right:6px;
  }
  @keyframes spin {to{transform:rotate(360deg);}}
  .loading {animation:blink 1s infinite;}
  @keyframes blink {0%,100%{opacity:.5;}50%{opacity:1;}}
  /* small grid tweaks for wizard fields (kept inline here for safety) */
  .wizard-grid .wizard-field label { display:block; margin-bottom:6px; font-weight:600; color:inherit; }
  .wizard-grid .wizard-field input, .wizard-grid .wizard-field textarea { width:100%; box-sizing:border-box; }
  `;
  // avoid duplicate insertion
  if (!document.getElementById(spinnerStyleFinal.id)) document.head.appendChild(spinnerStyleFinal);

  // ---------- safe init complete ----------
  // ensure saved templates loaded already
  loadSavedTemplates();

  // small accessibility: focus first control on load
  setTimeout(() => {
    if (templateSelect) templateSelect.tabIndex = 0;
  }, 200);
}); // DOMContentLoaded end
