document.addEventListener("DOMContentLoaded", () => {
  // --- 1. DARK/LIGHT MODE TOGGLE ---
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const icon = themeToggle.querySelector("i");

  // Check localStorage for saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    if (theme === "light") {
      icon.classList.remove("ph-moon");
      icon.classList.add("ph-sun");
    } else {
      icon.classList.remove("ph-sun");
      icon.classList.add("ph-moon");
    }
  }

  // --- 2. MOBILE MENU ---
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close menu when link is clicked
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  // --- 3. SCROLL REVEAL ANIMATION ---
  const observerOptions = {
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Apply observer to sections and cards
  const elementsToAnimate = document.querySelectorAll(
    ".section, .project-card, .timeline-item, .skill-badge"
  );

  elementsToAnimate.forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

  // --- 4. CONTACT FORM SUBMISSION (Frontend Only) ---
 emailjs.init("v4mbarDBgfzTOPFyt");
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log([...new FormData(this)]);
    emailjs
      .sendForm("service_cuqa7r4", "template_e3kvi98", this)
      .then(() => {
        alert("Message sent successfully :white_tick:");
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message :x:");
      });
  });
});

