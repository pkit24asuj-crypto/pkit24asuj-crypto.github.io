// Modern JavaScript for ePortfolio functionality

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = ["home", "fullstack", "html", "css", "bootstrap", "javascript"]
  const navLinks = document.querySelectorAll(".nav-link")

  let currentSection = ""

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const rect = section.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = sectionId
      }
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active")
    }
  })
}

// Interactive greeting generator
function generateGreeting() {
  const nameInput = document.getElementById("nameInput")
  const greetingOutput = document.getElementById("greetingOutput")
  const name = nameInput.value.trim()

  if (!name) {
    greetingOutput.innerHTML = '<span class="text-warning">Please enter your name first!</span>'
    return
  }

  const greetings = [
    `Hello ${name}! Welcome to my ePortfolio! 👋`,
    `Hi there ${name}! Thanks for visiting! 🌟`,
    `Greetings ${name}! Explore my full stack skills! 🚀`,
    `Welcome ${name}! Let's build something amazing! 💻`,
    `Hey ${name}! Ready to see some code magic? ✨`,
  ]

  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]

  // Add fade effect
  greetingOutput.style.opacity = "0"
  setTimeout(() => {
    greetingOutput.innerHTML = `<span class="text-primary fw-bold">${randomGreeting}</span>`
    greetingOutput.style.opacity = "1"
  }, 200)
}

// Theme switcher functionality
function changeTheme(theme) {
  const themeDemo = document.getElementById("themeDemo")

  // Remove existing theme classes
  themeDemo.classList.remove("light-theme", "dark-theme", "nature-theme")

  // Add new theme class
  themeDemo.classList.add(`${theme}-theme`)

  // Update content based on theme
  const themeMessages = {
    light: "Light theme activated! Clean and minimal design. ☀️",
    dark: "Dark theme activated! Easy on the eyes for coding. 🌙",
    nature: "Nature theme activated! Inspired by the outdoors. 🌿",
  }

  themeDemo.innerHTML = `<p class="mb-0">${themeMessages[theme]}</p>`
}

// Animate progress bars when they come into view
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-bar")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target
          const width = progressBar.style.width
          progressBar.style.width = "0%"
          setTimeout(() => {
            progressBar.style.width = width
          }, 100)
        }
      })
    },
    { threshold: 0.5 },
  )

  progressBars.forEach((bar) => observer.observe(bar))
}

// Add fade-in animation to cards when they come into view
function animateCards() {
  const cards = document.querySelectorAll(".card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up")
        }
      })
    },
    { threshold: 0.1 },
  )

  cards.forEach((card) => observer.observe(card))
}

// Handle navbar background on scroll
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar")

  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(8, 145, 178, 0.95)"
  } else {
    navbar.style.backgroundColor = "rgba(8, 145, 178, 1)"
  }
}

// Form validation for the name input
function validateNameInput() {
  const nameInput = document.getElementById("nameInput")

  nameInput.addEventListener("input", function () {
    const value = this.value.trim()

    if (value.length > 0 && value.length < 2) {
      this.classList.add("is-invalid")
      this.classList.remove("is-valid")
    } else if (value.length >= 2) {
      this.classList.add("is-valid")
      this.classList.remove("is-invalid")
    } else {
      this.classList.remove("is-valid", "is-invalid")
    }
  })

  // Allow Enter key to trigger greeting generation
  nameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      generateGreeting()
    }
  })
}

// Skills data for dynamic content
const skillsData = {
  frontend: {
    HTML: 95,
    CSS: 90,
    JavaScript: 88,
    Bootstrap: 92,
    React: 80,
    "Vue.js": 75,
  },
  backend: {
    "Node.js": 85,
    Python: 80,
    PHP: 75,
    "Express.js": 82,
    MongoDB: 78,
    MySQL: 85,
  },
  tools: {
    "Git/GitHub": 90,
    "VS Code": 95,
    Webpack: 70,
    "Sass/SCSS": 85,
    "NPM/Yarn": 88,
    "Chrome DevTools": 92,
  },
}

// Dynamic skills showcase
function createSkillsChart() {
  // This would typically integrate with a charting library
  // For now, we'll create a simple text-based representation
  console.log("Skills data loaded:", skillsData)
}

// Local storage for user preferences
function saveUserPreferences() {
  const preferences = {
    lastVisited: new Date().toISOString(),
    preferredTheme: "light",
    viewedSections: [],
  }

  localStorage.setItem("eportfolio-preferences", JSON.stringify(preferences))
}

function loadUserPreferences() {
  const saved = localStorage.getItem("eportfolio-preferences")
  if (saved) {
    const preferences = JSON.parse(saved)
    console.log("Welcome back! Last visited:", preferences.lastVisited)
    return preferences
  }
  return null
}

// Performance monitoring
function trackPagePerformance() {
  if ("performance" in window) {
    window.addEventListener("load", () => {
      const perfData = performance.getEntriesByType("navigation")[0]
      console.log("Page load time:", perfData.loadEventEnd - perfData.loadEventStart, "ms")
    })
  }
}

// Error handling
function setupErrorHandling() {
  window.addEventListener("error", (e) => {
    console.error("JavaScript error:", e.error)
    // In a real application, you might send this to an error tracking service
  })

  window.addEventListener("unhandledrejection", (e) => {
    console.error("Unhandled promise rejection:", e.reason)
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("ePortfolio JavaScript initialized")

  // Initialize all functionality
  animateProgressBars()
  animateCards()
  validateNameInput()
  createSkillsChart()
  loadUserPreferences()
  trackPagePerformance()
  setupErrorHandling()

  // Set up event listeners
  window.addEventListener("scroll", () => {
    updateActiveNavLink()
    handleNavbarScroll()
  })

  // Add click handlers for navigation
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      scrollToSection(targetId)
    })
  })

  // Save preferences on page unload
  window.addEventListener("beforeunload", saveUserPreferences)

  console.log("All ePortfolio features loaded successfully! 🚀")
})

// Export functions for potential module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    scrollToSection,
    generateGreeting,
    changeTheme,
    skillsData,
  }
}
