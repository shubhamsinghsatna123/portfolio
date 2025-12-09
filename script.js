const navLinks = document.querySelectorAll(".nav a");
const topNavLinks = document.querySelectorAll(".top-navbar-links a");
const topNavbar = document.getElementById("top-navbar");
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const themeIcon = themeToggleBtn.querySelector("i");
let lastScrollTop = 0;

// Navigation active state
const updateActiveNav = (targetHref) => {
  // Update sidebar nav
  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === targetHref) {
      link.classList.add("active");
    }
  });
  
  // Update top navbar nav
  topNavLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === targetHref) {
      link.classList.add("active");
    }
  });
};

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetHref = link.getAttribute("href");
    updateActiveNav(targetHref);
    
    const target = document.querySelector(targetHref);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

topNavLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetHref = link.getAttribute("href");
    updateActiveNav(targetHref);
    
    const target = document.querySelector(targetHref);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Theme toggle functionality
const getTheme = () => {
  return localStorage.getItem("theme") || "dark";
};

const setTheme = (theme) => {
  document.documentElement.classList.toggle("light", theme === "light");
  localStorage.setItem("theme", theme);
  
  // Update icon
  if (theme === "light") {
    themeIcon.classList.remove("bx-sun");
    themeIcon.classList.add("bx-moon");
  } else {
    themeIcon.classList.remove("bx-moon");
    themeIcon.classList.add("bx-sun");
  }
};

// Initialize theme
setTheme(getTheme());

// Toggle theme on button click
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
});

// Show/hide top navbar on scroll
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const themeToggle = document.querySelector(".theme-toggle");
  const isMobile = window.innerWidth <= 900;
  
  if (scrollTop > 100) {
    // Show navbar when scrolled down
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      // Scrolling down - show navbar
      topNavbar.classList.add("visible");
      if (themeToggle) {
        themeToggle.style.top = isMobile ? "100px" : "80px";
      }
    }
  } else {
    // Hide navbar when at top
    topNavbar.classList.remove("visible");
    if (themeToggle) {
      themeToggle.style.top = "20px";
    }
  }
  
  lastScrollTop = scrollTop;
  
  // Update active nav based on scroll position
  const sections = document.querySelectorAll("section[id]");
  let current = "";
  
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollTop >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });
  
  if (current) {
    updateActiveNav(`#${current}`);
  }
});

// Contact form handling
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const message = formData.get("message");
    
    // Reset status
    formStatus.textContent = "";
    formStatus.classList.remove("success", "error");
    
    // Validate
    if (!fullname || !email || !message) {
      formStatus.textContent = "Please fill in all fields.";
      formStatus.classList.add("error");
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = "Please enter a valid email address.";
      formStatus.classList.add("error");
      return;
    }
    
    // Simulate form submission (you can replace this with actual API call)
    formStatus.textContent = "Sending message...";
    formStatus.classList.add("success");
    
    // Simulate API call delay
    setTimeout(() => {
      formStatus.textContent = "Message sent successfully! I'll get back to you soon.";
      formStatus.classList.remove("error");
      formStatus.classList.add("success");
      contactForm.reset();
      
      // Clear status after 5 seconds
      setTimeout(() => {
        formStatus.textContent = "";
        formStatus.classList.remove("success");
      }, 5000);
    }, 1000);
  });
}

