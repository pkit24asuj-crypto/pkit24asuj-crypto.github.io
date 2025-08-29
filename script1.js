// Nepal Wikipedia Interactive Features

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all interactive features
  initializeSearch()
  initializeDarkMode()
  initializeBackToTop()
  initializeSmoothScrolling()
  initializeImageLazyLoading()
  initializePrintFunction()

  console.log("[v0] Nepal Wikipedia loaded successfully")
})

// Search Functionality
function initializeSearch() {
  const searchInput = document.querySelector(".search-input")
  const searchBtn = document.querySelector(".search-btn")

  if (searchInput && searchBtn) {
    // Search on button click
    searchBtn.addEventListener("click", performSearch)

    // Search on Enter key
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch()
      }
    })

    // Live search suggestions (simplified)
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase()
      if (query.length > 2) {
        highlightSearchResults(query)
      } else {
        clearHighlights()
      }
    })
  }
}

function performSearch() {
  const searchInput = document.querySelector(".search-input")
  const query = searchInput.value.toLowerCase().trim()

  if (query) {
    // Clear previous highlights
    clearHighlights()

    // Find and highlight matching content
    const found = highlightSearchResults(query)

    if (found) {
      // Scroll to first match
      const firstMatch = document.querySelector(".search-highlight")
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    } else {
      alert(`No results found for "${query}"`)
    }
  }
}

function highlightSearchResults(query) {
  const contentSections = document.querySelectorAll(".content-section")
  let found = false

  contentSections.forEach((section) => {
    const textNodes = getTextNodes(section)
    textNodes.forEach((node) => {
      const text = node.textContent.toLowerCase()
      if (text.includes(query)) {
        const highlightedText = node.textContent.replace(
          new RegExp(query, "gi"),
          (match) => `<span class="search-highlight">${match}</span>`,
        )
        const wrapper = document.createElement("span")
        wrapper.innerHTML = highlightedText
        node.parentNode.replaceChild(wrapper, node)
        found = true
      }
    })
  })

  return found
}

function clearHighlights() {
  const highlights = document.querySelectorAll(".search-highlight")
  highlights.forEach((highlight) => {
    const parent = highlight.parentNode
    parent.replaceChild(document.createTextNode(highlight.textContent), highlight)
    parent.normalize()
  })
}

function getTextNodes(element) {
  const textNodes = []
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false)

  let node
  while ((node = walker.nextNode())) {
    if (node.textContent.trim()) {
      textNodes.push(node)
    }
  }

  return textNodes
}

// Dark Mode Toggle
function initializeDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle")
  const body = document.body

  // Check for saved dark mode preference
  const isDarkMode = localStorage.getItem("darkMode") === "true"
  if (isDarkMode) {
    body.classList.add("dark-mode")
    updateDarkModeIcon(true)
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode")
      const isNowDark = body.classList.contains("dark-mode")

      // Save preference
      localStorage.setItem("darkMode", isNowDark)
      updateDarkModeIcon(isNowDark)

      // Smooth transition effect
      body.style.transition = "all 0.3s ease"
      setTimeout(() => {
        body.style.transition = ""
      }, 300)
    })
  }
}

function updateDarkModeIcon(isDark) {
  const icon = document.querySelector("#darkModeToggle i")
  if (icon) {
    icon.className = isDark ? "fas fa-sun" : "fas fa-moon"
  }
}

// Back to Top Button
function initializeBackToTop() {
  const backToTopBtn = document.getElementById("backToTop")

  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show")
      } else {
        backToTopBtn.classList.remove("show")
      }
    })

    // Scroll to top on click
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"], .toc-list a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const headerOffset = 100
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        // Update active navigation
        updateActiveNavigation(targetId)
      }
    })
  })

  // Update active navigation on scroll
  window.addEventListener("scroll", throttle(updateActiveNavigationOnScroll, 100))
}

function updateActiveNavigation(activeId) {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${activeId}`) {
      link.classList.add("active")
    }
  })
}

function updateActiveNavigationOnScroll() {
  const sections = document.querySelectorAll(".content-section")
  const scrollPosition = window.pageYOffset + 150

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute("id")

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      updateActiveNavigation(sectionId)
    }
  })
}

// Image Lazy Loading
function initializeImageLazyLoading() {
  const images = document.querySelectorAll('img[src*="placeholder.svg"]')

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.classList.add("fade-in")
          observer.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }
}

// Print Functionality
function initializePrintFunction() {
  const links = document.querySelectorAll('a[href="#"]');
  const printLinks = Array.from(links).filter(link =>
    link.textContent.includes("Print")
  );

  printLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.print();
    });
  });
}


// Utility Functions
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Add CSS for search highlights and animations
const style = document.createElement("style")
style.textContent = `
    .search-highlight {
        background-color: #ffeb3b;
        color: #000;
        padding: 2px 4px;
        border-radius: 3px;
        font-weight: bold;
    }
    
    .dark-mode .search-highlight {
        background-color: #ff9800;
        color: #000;
    }
    
    .fade-in {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .nav-link.active {
        color: var(--primary-color) !important;
        font-weight: 600;
        background-color: rgba(0, 102, 204, 0.1);
        border-radius: 4px;
        padding-left: 0.5rem !important;
    }
`
document.head.appendChild(style)

// Share Functionality

          function initializeShareFunction() {
  const links = document.querySelectorAll('a[href="#"]');
  const shareLinks = Array.from(links).filter(link =>
    link.textContent.includes("Share")
  );

  shareLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      if (navigator.share) {
        navigator.share({
          title: "Nepal - Wikipedia",
          text: "Learn about Nepal, the beautiful Himalayan country",
          url: window.location.href,
        });
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          alert("URL copied to clipboard!");
        });
      }
    });
  });
}


// Initialize share functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeShareFunction()
})

// Bookmark Functionality
function initializeBookmarkFunction() {
  const links = document.querySelectorAll('a[href="#"]');
  const bookmarkLinks = Array.from(links).filter(link =>
    link.textContent.includes("Bookmark")
  );

  bookmarkLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      const currentPage = {
        title: document.title,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      };

      const existingIndex = bookmarks.findIndex(b => b.url === currentPage.url);
      if (existingIndex === -1) {
        bookmarks.push(currentPage);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        alert("Page bookmarked!");
      } else {
        alert("Page already bookmarked!");
      }
    });
  });
}


// Initialize bookmark functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeBookmarkFunction()
})
