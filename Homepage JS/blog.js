// ===== BLOG SECTION DATA =====
const mkBlogsData = [
  {
    tag: "Introduction",
    title: "Mail Karo: AI Email Assistant (Complete Introduction)",
    summary:
      "Mail Karo helps you write, analyze, and improve emails in seconds using templates and tone control. " +
      "This blog explains what Mail Karo is, how it works, and who should use it. " +
      "Perfect starting point for new users.",
    link: "./blog/intro-blog.html"
  },
  {
    tag: "Core Feature",
    title: "Email Generation: Create Professional Emails Instantly",
    summary:
      "Learn how Mail Karo generates clean professional emails using templates + tone + length control. " +
      "This guide explains best inputs, use cases, and common mistakes users make. " +
      "Best for students, job seekers, and professionals.",
    link: "./blog/email-generation-blog.html"
  },
  {
    tag: "Checker Tool",
    title: "Email Quality Checker: Improve Clarity, Tone & Professionalism",
    summary:
      "Before sending an email, check clarity, tone, structure, and professionalism using Mail Karo’s quality checker. " +
      "This blog explains what it checks, how to use it properly, and pro writing tips. " +
      "A must-read for HR/teacher/client mails.",
    link: "./blog/email-quality-checker-blog.html"
  },
  {
    tag: "Utility Tool",
    title: "PDF Converter: Export Your Email as a Clean Professional PDF",
    summary:
      "Convert your email draft into a downloadable PDF instantly. " +
      "Useful for college submissions, HR proof, printing, and official documentation. " +
      "This blog explains steps, benefits, and best practices.",
    link: "./blog/pdf-converter-blog.html"
  },
  {
    tag: "Vision",
    title: "Mail Karo Vision: Why Email Matters in Today’s World",
    summary:
      "Email is still the official communication skill behind internships, jobs, and professional growth. " +
      "This blog explains email basics deeply and how Mail Karo aims to make communication easier for everyone. " +
      "The most important long-term guide.",
    link: "./blog/mail-karo-vision-blog.html"
  }
];

// ===== BLOG SECTION RENDER =====
(function renderMkBlogs() {
  const grid = document.getElementById("mkBlogsGrid");
  if (!grid) return;

  const cardsHTML = mkBlogsData
    .map(
      (b) => `
      <article class="mk-blog-card">
        <div class="mk-blog-card-top">
          <div class="mk-blog-card-pill">${b.tag}</div>
          <h3>${b.title}</h3>
          <p>${b.summary}</p>
          <a class="mk-blog-readmore" href="${b.link}">Read More</a>
        </div>
      </article>
    `
    )
    .join("");

  grid.innerHTML = cardsHTML;
})();

// ===== Scroll Reveal Animation (Blog Section) =====
document.addEventListener("DOMContentLoaded", () => {
  const blogSection = document.querySelector(".mk-blogs-reveal");

  if (blogSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    observer.observe(blogSection);
  }
});
