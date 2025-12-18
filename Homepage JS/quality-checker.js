const sourceSelect = document.getElementById("emailSource");
const input = document.getElementById("qualityInput");
const runBtn = document.getElementById("runQualityCheck");
const resultBox = document.getElementById("qualityResult");

// counts
input.addEventListener("input", () => {
  document.getElementById("charCount").innerText =
    input.value.length + " chars";
  document.getElementById("wordCount").innerText =
    input.value.trim().split(/\s+/).filter(Boolean).length + " words";
});

// source logic
sourceSelect.addEventListener("change", () => {
  if (sourceSelect.value === "generated") {
    const generated = document.getElementById("generatedEmail")?.innerText;
    if (!generated) {
      alert("Generate an email first.");
      sourceSelect.value = "manual";
      return;
    }
    input.value = generated;
    input.setAttribute("readonly", true);
  } else {
    input.value = "";
    input.removeAttribute("readonly");
  }
});

// run check
runBtn.addEventListener("click", async () => {
  if (!input.value.trim()) return alert("Email content required.");

  runBtn.innerText = "Analyzing...";
  runBtn.disabled = true;

  const res = await fetch("/api/quality-check", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: input.value })
  });

  const data = await res.json();
  renderResult(data);

  runBtn.innerText = "⚡ Run Quality Check";
  runBtn.disabled = false;
});

function renderResult(data) {
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    <h3>Quality Score: ${data.score}/100</h3>
    <p>${data.summary}</p>
    <ul>
      <li>Grammar: ${data.grammar}</li>
      <li>Clarity: ${data.clarity}</li>
      <li>Tone: ${data.tone}</li>
      <li>Risk: ${data.risk}</li>
    </ul>
  `;
}
