document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const section = document.querySelector('.current-features-section');
  const cards = document.querySelectorAll('.cf-card');
  const toneSelect = document.getElementById('cf-tone-select');
  const lengthSelect = document.getElementById('cf-length-scroll');
  const templateSelect = document.getElementById('cf-template-select');
  const themeToggleCard = document.getElementById('cf-theme-toggle');
  
  // 1. Scroll Animations (Intersection Observer)
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once visible if you want it to happen only once
        // observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 100}ms`; // Stagger effect
    observer.observe(card);
  });
  
  if(section) observer.observe(section);

  // 2. Card Functionality
  
  // Card 1: AI Email Generation -> Scroll to Prompt
  const genBtn = document.getElementById('cf-gen-btn');
  if (genBtn) {
    genBtn.addEventListener('click', () => {
      document.querySelector('#prompt').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Card 2: PDF Converter -> Trigger PDF Download (mock or call existing if available)
  const pdfBtn = document.getElementById('cf-pdf-btn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      // Check if the main PDF function exists, otherwise alert or scroll
      const mainPdfBtn = document.getElementById('mkPdfDownloadBtn');
      if (mainPdfBtn) {
        mainPdfBtn.click(); // Trigger the actual download button
        alert('Triggering PDF Download...');
      } else {
        alert('PDF feature is active in the main section!');
      }
    });
  }

  // Card 3: Tone Selector -> Interactive UI
  if (toneSelect) {
    toneSelect.addEventListener('change', (e) => {
        // Update the main tone selector if it exists
        const mainTone = document.getElementById('toneSelect');
        if(mainTone) {
            mainTone.value = e.target.value;
            // Highlight/Shake the main section to show it updated?
        }
    });
  }

  // Card 4: Length Selector
  const lengthButtons = document.querySelectorAll('.cf-length-btn');
  lengthButtons.forEach(btn => {
      btn.addEventListener('click', () => {
          lengthButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          const val = btn.dataset.value;
          const mainLen = document.getElementById('lengthSelect');
          if(mainLen) mainLen.value = val;
      });
  });

  // Card 5: Template Selector
  if(templateSelect) {
      templateSelect.addEventListener('change', (e) => {
          const mainTemp = document.getElementById('templateSelect');
          if(mainTemp) {
              mainTemp.value = e.target.value;
              // Trigger change event if needed for main logic to pick it up
              mainTemp.dispatchEvent(new Event('change'));
          }
      });
  }

  // Card 6: Dark/Light Mode
  if (themeToggleCard) {
    themeToggleCard.addEventListener('click', () => {
      const currentTheme = document.documentElement.dataset.theme;
      const newTheme = currentTheme === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = newTheme;
      localStorage.setItem("theme", newTheme);
      
      // Update icon in card
      updateThemeCardState(newTheme);
      
      // Also update the main navbar toggle if it exists to keep sync
      // (The main one usually handles its own state, but we ensure sync)
    });
  }

  function updateThemeCardState(theme) {
      const icon = themeToggleCard.querySelector('.cf-icon i');
      const text = themeToggleCard.querySelector('h3');
      if(theme === 'light') {
          icon.className = 'fas fa-sun';
          text.textContent = 'Light Mode';
      } else {
          icon.className = 'fas fa-moon';
          text.textContent = 'Dark Mode';
      }
  }
  
  // Initial State Check
  if(themeToggleCard) {
      updateThemeCardState(document.documentElement.dataset.theme || 'dark');
  }

});
