// Mobile navigation toggle
function toggleNav() {
  const nav = document.getElementById('navLinks');
  const toggle = document.querySelector('.nav-toggle');
  const isOpen = nav.classList.toggle('mobile-open');
  
  // Update ARIA state for accessibility
  if (toggle) {
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  const nav = document.getElementById('navLinks');
  const toggle = document.querySelector('.nav-toggle');
  
  if (nav && toggle && nav.classList.contains('mobile-open')) {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) {
      nav.classList.remove('mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }
});

// Close mobile menu on escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const nav = document.getElementById('navLinks');
    const toggle = document.querySelector('.nav-toggle');
    
    if (nav && nav.classList.contains('mobile-open')) {
      nav.classList.remove('mobile-open');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  }
});
