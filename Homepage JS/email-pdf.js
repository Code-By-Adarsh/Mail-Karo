/* Mail Karo — FINAL PDF ENGINE (Yellow Theme + Watermark + Button Logic) */
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(() => {
    const outEl = document.getElementById("outputText");
    const downloadBtn = document.getElementById("mkPdfDownloadBtn");
    const previewBtn = document.getElementById("mkPdfPreviewBtn");

    if (!outEl || !downloadBtn || !previewBtn) {
      console.warn("PDF widget missing elements");
      return;
    }

    /* --------------------------------------------------------------------
       1) DISABLE BUTTONS INITIALLY + AUTO-SCROLL TO PROMPT
    --------------------------------------------------------------------*/
    function disableButtons() {
      downloadBtn.disabled = true;
      previewBtn.disabled = true;

      const handler = () => {
        document.querySelector("#prompt")?.scrollIntoView({ behavior: "smooth" });
      };

      downloadBtn.addEventListener("click", handler, { once: true });
      previewBtn.addEventListener("click", handler, { once: true });
    }

    function enableButtons() {
      downloadBtn.disabled = false;
      previewBtn.disabled = false;
    }

    disableButtons();

    // Watch for new email generation
    const observer = new MutationObserver(() => {
      const text = outEl.innerText.trim();

      if (!text ||
          text === "Your AI-generated email will appear here..." ||
          text === "Generating email...") {
        disableButtons();
      } else {
        enableButtons();
      }
    });

    observer.observe(outEl, { childList: true, subtree: true });


    /* --------------------------------------------------------------------
       2) LOAD jsPDF (Auto load)
    --------------------------------------------------------------------*/
    function ensureJsPdf() {
      return new Promise((resolve, reject) => {
        if (window.jspdf) return resolve(window.jspdf.jsPDF);

        const s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        s.onload = () => {
          if (!window.jspdf) return reject("jsPDF not loaded");
          resolve(window.jspdf.jsPDF);
        };
        s.onerror = () => reject("Failed to load jsPDF");
        document.head.appendChild(s);
      });
    }

    /* --------------------------------------------------------------------
       3) FILENAME — first 1-2 meaningful words
    --------------------------------------------------------------------*/
    function makeFilename(text) {
      if (!text) return "email.pdf";
      const words = text.trim().split(/\s+/).slice(0, 2).join("_");
      return (words || "email") + ".pdf";
    }


    /* --------------------------------------------------------------------
       4) PDF Creator — Yellow Theme + Watermark
    --------------------------------------------------------------------*/
    async function createPdf({ preview = false } = {}) {
      const content = outEl.innerText.trim();
      if (!content) {
        alert("Generate an email first.");
        return;
      }

      const jsPDF = await ensureJsPdf();
      const doc = new jsPDF({ unit: "pt", format: "a4" });

      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 40;
      const usable = pageW - margin * 2;

      /* ---- WATERMARK LOGO (CHANGE PATH HERE) ---- */
      const logoPath = "All Images/Detail logo.png"; // ⭐⭐⭐ CHANGE THIS PATH IF NEEDED ⭐⭐⭐

      let watermarkImg = null;

      try {
        const blob = await fetch(logoPath).then(r => r.blob());
        watermarkImg = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      } catch (err) {
        console.warn("Watermark logo missing, continuing without watermark.");
      }

      /* ---- TITLE (Yellow) ---- */
      const title = content.split("\n")[0] || "Mail Karo Email";

      doc.setFontSize(18);
      doc.setTextColor(250, 204, 21); // MAIL KARO YELLOW THEME (#FACC15)
      doc.text(title, margin, 60);

      /* ---- BODY ---- */
      const body = doc.splitTextToSize(content, usable);

      doc.setFontSize(12);
      doc.setTextColor(60, 50, 20); // warm grey for yellow theme

      let cursor = 100;

      for (let line of body) {
        if (cursor > pageH - 80) {
          doc.addPage();
          cursor = 60;
        }

        doc.text(line, margin, cursor);
        cursor += 16;
      }

      /* ---- WATERMARK ON EVERY PAGE ---- */
      if (watermarkImg) {
        const total = doc.getNumberOfPages();

        for (let i = 1; i <= total; i++) {
          doc.setPage(i);

          doc.setGState(doc.GState({ opacity: 0.10 })); // 10% opacity watermark

          const wmW = 280;
          const wmH = 280;

          doc.addImage(
            watermarkImg,
            "PNG",
            (pageW - wmW) / 2,
            (pageH - wmH) / 2,
            wmW,
            wmH
          );

          doc.setGState(doc.GState({ opacity: 1 }));
        }
      }

      /* ---- FOOTER ---- */
      doc.setFontSize(10);
      doc.setTextColor(180, 160, 60); // golden grey footer

      doc.text("Generated by Mail Karo", margin, pageH - 30);

      /* ---- Save or Preview ---- */
      const filename = makeFilename(title);

      if (preview) {
        window.open(doc.output("bloburl"), "_blank");
      } else {
        doc.save(filename);
      }
    }


    /* --------------------------------------------------------------------
       5) BUTTON HANDLERS
    --------------------------------------------------------------------*/
    downloadBtn.onclick = () => createPdf({ preview: false });
    previewBtn.onclick = () => createPdf({ preview: true });
  });
})();
