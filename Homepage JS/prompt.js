document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");
  const promptInput = document.getElementById("promptInput");
  const outputText = document.getElementById("outputText");
  const copyBtn = document.getElementById("copyBtn");

  // 👇 async function
  generateBtn.addEventListener("click", async () => {
    const prompt = promptInput.value.trim();

    if (prompt === "") {
      outputText.innerText = "⚠️ Please enter a prompt before generating!";
      outputText.style.color = "#FFD700";
      return;
    }

    outputText.style.color = "#EAEAEA";
    outputText.innerText = "✉️ Generating your email...";
    outputText.classList.add("loading");

    try {
      // 🔗 Connect to local backend API
      const API_URL = "http://localhost:3000/api/generate-email";
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate email");
      }

      if (data.success && data.email) {
        outputText.classList.remove("loading");
        outputText.style.color = "#EAEAEA";
        outputText.innerText = data.email;
      } else {
        throw new Error("Invalid response from server");
      }

    } catch (err) {
      outputText.classList.remove("loading");
      outputText.innerText = `⚠️ Error: ${err.message || "Failed to generate email. Please try again."}`;
      outputText.style.color = "#FF6B6B";
      console.error("❌ Fetch Error:", err);
    }
  });

  // 📋 Copy button
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(outputText.innerText);
    copyBtn.innerText = "Copied!";
    setTimeout(() => (copyBtn.innerText = "Copy"), 1500);
  });
});

// ✨ Loading animation
const promptStyle = document.createElement("style");
promptStyle.innerHTML = `
.loading { animation: blink 0.8s infinite; }
@keyframes blink { 0%,100%{opacity:.5;} 50%{opacity:1;} }
`;
document.head.appendChild(promptStyle);
