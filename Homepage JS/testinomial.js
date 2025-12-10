// Testimonials data
const testimonialsData = [
  {
    name: "Aarav Shah",
    role: "Freelance Developer",
    img: "https://i.pravatar.cc/80?img=11",
    text:
      "Mail Karo has completely transformed the way I write emails for clients. Instead of staring at a blank screen and overthinking every sentence, I simply describe what I want to say and let the tool structure it clearly. It saves me time, reduces stress, and makes every message sound intentional and professional."
  },
  {
    name: "Meera Nair",
    role: "College Student",
    img: "https://i.pravatar.cc/80?img=15",
    text:
      "I use Mail Karo whenever I need to write to professors about projects, deadlines, or recommendations. The tone is always respectful and clear, and the language never feels robotic. It has helped me avoid awkward phrasing and build more confident communication with faculty and internship coordinators."
  },
  {
    name: "Rohan Verma",
    role: "Startup Founder",
    img: "https://i.pravatar.cc/80?img=20",
    text:
      "As a founder, I send dozens of emails every week to investors, partners, and early users. Mail Karo helps me turn rough thoughts into structured emails in minutes. It keeps my writing concise while still sounding human, and that balance is extremely valuable when I am short on time but high on responsibilities."
  },
  {
    name: "Priya Singh",
    role: "Marketing Intern",
    img: "https://i.pravatar.cc/80?img=25",
    text:
      "I used to spend a lot of time editing my emails because I was scared of sounding unprofessional. With Mail Karo, I can draft a mail quickly, review the suggestions, and send it with confidence. It has improved not only my communication but also my comfort in taking initiative through email."
  },
  {
    name: "Aditya Kulkarni",
    role: "Customer Support Executive",
    img: "https://i.pravatar.cc/80?img=28",
    text:
      "Handling customer queries requires clarity and empathy in every line. Mail Karo helps me structure replies that are easy to understand, polite, and direct. Instead of rewriting the same responses every day, I rely on the tool to shape my messages while I focus on solving the actual problem."
  },
  {
    name: "Simran Kaur",
    role: "Business Analyst",
    img: "https://i.pravatar.cc/80?img=36",
    text:
      "Many of my emails involve explaining complex ideas to people who do not have the same technical background. Mail Karo helps me simplify my explanations without losing meaning. The resulting emails are cleaner, more readable, and much more likely to get a helpful response from stakeholders."
  },
  {
    name: "Rahul Mehta",
    role: "HR Coordinator",
    img: "https://i.pravatar.cc/80?img=40",
    text:
      "From scheduling interviews to sending follow-ups and feedback, my inbox is constantly busy. Mail Karo helps me maintain a consistent tone that is warm yet professional. It has reduced the time I spend drafting each message and ensured that my communication reflects the culture of our organization."
  },
  {
    name: "Ananya Gupta",
    role: "Content Creator",
    img: "https://i.pravatar.cc/80?img=47",
    text:
      "I regularly collaborate with brands, agencies, and other creators, and a lot of those relationships start with one good email. Mail Karo helps me introduce myself clearly, pitch my ideas with structure, and respond gracefully to feedback. It makes my communication feel polished without losing my personal voice."
  }
];

// Expand to exactly 20 entries
const testimonials = [];
while (testimonials.length < 20) {
  for (let t of testimonialsData) {
    if (testimonials.length === 20) break;
    testimonials.push({ ...t }); // shallow clone
  }
}

// ===== DOM references =====
const slider = document.getElementById("mkSlider");
const prevBtn = document.getElementById("mkPrev");
const nextBtn = document.getElementById("mkNext");
const sliderContainer = document.querySelector(".mk-slider-container");

// Generate random star rating
function getStars() {
  const count = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5
  return "★".repeat(count) + "☆".repeat(5 - count);
}

// Create and inject testimonial cards
testimonials.forEach((t, idx) => {
  const card = document.createElement("article");
  card.className = "mk-card";
  card.dataset.index = idx;
  card.innerHTML = `
    <p class="mk-text">${t.text}</p>

    <div class="mk-bottom-row">
        <div class="mk-user-info">
            <img src="${t.img}" alt="${t.name}">
            <div>
                <h4>${t.name}</h4>
                <span>${t.role}</span>
            </div>
        </div>

        <div class="mk-stars">${getStars()}</div>
    </div>
`;

  slider.appendChild(card);
});

const cards = Array.from(slider.querySelectorAll(".mk-card"));

let currentIndex = Math.floor((cards.length - 1) / 2); // start from middle
let direction = 1; // 1 = forward, -1 = backward
let autoTimer = null;

// Calculate card position
function getTranslateXForIndex(index) {
  const card = cards[index];
  if (!card) return 0;

  // Width of visible area
  const containerWidth = sliderContainer.clientWidth;

  // Use layout width 
  const cardWidth = card.offsetWidth;

  // Position from left inside the slider 
  const cardLeft = card.offsetLeft;

  // Center of the card in slider coords
  const cardCenter = cardLeft + cardWidth / 2;

  // cardCenter to align with the center of the container
  const containerCenter = containerWidth / 2;

  const translateX = containerCenter - cardCenter;

  return translateX;
}


// Update slider state
function updateSlider() {
  cards.forEach((card, i) => {
    card.classList.remove("active", "side");
    if (i === currentIndex) {
      card.classList.add("active");
    } else if (i === currentIndex - 1 || i === currentIndex + 1) {
      card.classList.add("side");
    }
  });

  const translateX = getTranslateXForIndex(currentIndex);
  slider.style.transform = `translateX(${translateX}px)`;
}


// Auto-advance slider
function stepAuto() {
  const lastIndex = cards.length - 1;

  if (currentIndex === lastIndex) {
    direction = -1;
  } else if (currentIndex === 0) {
    direction = 1;
  }

  currentIndex += direction;
  updateSlider();
}

function startAuto() {
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = setInterval(stepAuto, 7000);
}

function resetAuto() {
  startAuto();
}

// Navigation controls
prevBtn.addEventListener("click", () => {
  const lastIndex = cards.length - 1;
  currentIndex = Math.max(0, currentIndex - 1);
  // change direction toward left
  direction = currentIndex === 0 ? 1 : -1;
  updateSlider();
  resetAuto();
});

nextBtn.addEventListener("click", () => {
  const lastIndex = cards.length - 1;
  currentIndex = Math.min(lastIndex, currentIndex + 1);
  // change direction toward right
  direction = currentIndex === lastIndex ? -1 : 1;
  updateSlider();
  resetAuto();
});

// Re-center on resize for responsiveness
window.addEventListener("resize", () => {
  updateSlider();
});

// Initial position
updateSlider();
startAuto();

// ===== Scroll Reveal Animation =====
document.addEventListener("DOMContentLoaded", () => {
  const testimonialSection = document.querySelector(".mk-testimonials-reveal");

  if (testimonialSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Trigger only once
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -100px 0px" // Offset to ensure it doesn't trigger too early at the bottom
      }
    );

    observer.observe(testimonialSection);
  }
});
