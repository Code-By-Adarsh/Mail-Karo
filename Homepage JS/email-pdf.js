/* Mail Karo — FINAL PUBLIC URL PDF ENGINE (Watermark Behind Text) */
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
      console.warn("PDF section elements missing");
      return;
    }

    /* ---------------- SCROLL ANIMATION (IntersectionObserver) ---------------- */
    // Approach: Use IntersectionObserver to toggle 'mk-in-view' class when elements enter viewport.
    // Fallback: If IO is not supported, show elements immediately.
    const animElements = document.querySelectorAll('.mk-anim');

    if ('IntersectionObserver' in window) {
      const animObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('mk-in-view');
            observer.unobserve(entry.target); // Trigger only once
          }
        });
      }, { threshold: 0.2 }); // Trigger when 20% of the element is visible

      animElements.forEach(el => animObserver.observe(el));
    } else {
      // Fallback for older browsers
      animElements.forEach(el => el.classList.add('mk-in-view'));
    }

    /* ---------------- BUTTON CONTROL ---------------- */
    function disableBtns() {
      downloadBtn.disabled = true;
      previewBtn.disabled = true;
      downloadBtn.style.opacity = "0.5";
      previewBtn.style.opacity = "0.5";
    }

    function enableBtns() {
      downloadBtn.disabled = false;
      previewBtn.disabled = false;
      downloadBtn.style.opacity = "1";
      previewBtn.style.opacity = "1";
    }

    disableBtns();

    /* ---------------- OUTPUT WATCHER ---------------- */
    const observer = new MutationObserver(() => {
      const t = outEl.innerText.trim();

      if (
        !t ||
        t.includes("Your AI-generated email will appear here") ||
        t.includes("Generating email") ||
        t.length < 10
      ) {
        disableBtns();
      } else {
        enableBtns();
      }
    });

    observer.observe(outEl, { childList: true, subtree: true });

    /* ---------------- LOAD jsPDF ---------------- */
    function loadJsPDF() {
      return new Promise((resolve, reject) => {
        if (window.jspdf) return resolve(window.jspdf.jsPDF);

        const s = document.createElement("script");
        s.src =
          "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        s.onload = () => resolve(window.jspdf.jsPDF);
        s.onerror = () => reject("Failed to load jsPDF");
        document.head.appendChild(s);
      });
    }

    /* ---------------- PUBLIC URL WATERMARK ---------------- */
    const watermarkURL =
      "https://mail-karo.netlify.app/All%20Images/Logo.png";

    function loadWatermark() {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous"; // important for CORS
        img.onload = () => resolve(img);
        img.onerror = () => reject("Watermark failed");
        img.src = watermarkURL + "?v=" + Date.now();
      });
    }

    /* ---------------- PDF CREATOR ---------------- */
    async function createPdf({ preview = false }) {
      const text = outEl.innerText.trim();
      if (!text || text.includes("Generating")) {
        alert("Generate an email first.");
        return;
      }

      const jsPDF = await loadJsPDF();
      const doc = new jsPDF({ unit: "pt", format: "a4" });

      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const margin = 40;

      /* ---- Load watermark BEFORE adding text ---- */
      let wm = null;
      try {
        wm = await loadWatermark();
      } catch (err) {
        console.warn(err);
      }

      /* ---- Add Watermark on every new page FIRST ---- */
      function addWatermark(pageIndex) {
        if (!wm) return;

        doc.setPage(pageIndex);
        doc.addImage(
          wm,
          "PNG",
          (pageW - 260) / 2,
          (pageH - 260) / 2,
          260,
          260,
          "",
          "FAST",    // faster + stable
          0.06       // ⭐ VERY light opacity (background effect)
        );
      }

      /* Add watermark to the FIRST page before text */
      addWatermark(1);

      /* ---- BODY TEXT ---- */
      const body = doc.splitTextToSize(text, pageW - margin * 2);
      let y = 40;

      doc.setFontSize(12);
      doc.setTextColor(40, 40, 40);

      body.forEach((line) => {
        if (y > pageH - 60) {
          doc.addPage();
          const newPage = doc.getNumberOfPages();
          addWatermark(newPage); // watermark BEFORE text
          y = 40;
        }
        doc.text(line, margin, y);
        y += 16;
      });

      /* ---- FOOTER ---- */
      doc.setFontSize(10);
      doc.setTextColor(160, 140, 40);
      doc.text("Generated by Mail Karo", margin, pageH - 30);

      /* ---- EXPORT ---- */
      if (preview) {
        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        doc.save("MailKaro_Email.pdf");
      }
    }

    /* ---------------- BUTTON EVENTS ---------------- */
    downloadBtn.onclick = () => createPdf({ preview: false });
    previewBtn.onclick = () => createPdf({ preview: true });
  });
})();
