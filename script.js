// Service icons mapping
const serviceIcons = [
  { value: 'Code', label: 'Development', icon: 'Code' },
  { value: 'Palette', label: 'Design', icon: 'Palette' },
  { value: 'Globe', label: 'Web Services', icon: 'Globe' },
  { value: 'Smartphone', label: 'Mobile', icon: 'Smartphone' },
  { value: 'Database', label: 'Database', icon: 'Database' },
  { value: 'Shield', label: 'Security', icon: 'Shield' }
];

// Get icon component based on icon name
function getIcon(iconName) {
  if (!iconName) return 'Code';
  const iconData = serviceIcons.find(icon => icon.value === iconName);
  return iconData?.icon || 'Code';
}

// Render star ratings based on skill level
function renderStars(level) {
  if (!level) return null;
  
  const starCount = {
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3,
    'Expert': 4
  }[level] || 0;

  const stars = [];
  for (let i = 0; i < 4; i++) {
    stars.push(
      `<svg key="${i}" class="w-4 h-4 ${i < starCount ? 'text-yellow-400 fill-current' : 'text-gray-300'}" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>`
    );
  }
  
  return `<div class="flex gap-0.5">${stars.join('')}</div>`;
}

// Scroll to section with smooth animation
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }
}

// Initialize template functionality
function initTemplate() {
  const [isMenuOpen, setIsMenuOpen] = [false, (value) => {}];
  const [activeSection, setActiveSection] = ['hero', (value) => {}];
  const [isScrolled, setIsScrolled] = [false, (value) => {}];

  // Handle scroll events
  function handleScroll() {
    setIsScrolled(window.scrollY > 50);

    // Update active section based on scroll position
    const sections = ['hero', 'about', 'skills', 'services', 'portfolio', 'testimonials', 'contact'];
    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    
    if (currentSection) {
      setActiveSection(currentSection);
    }
  }

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
  
  // Get navigation items based on available data
  function getNavigationItems(data) {
    const items = [{ id: 'hero', label: 'Home' }];

    if (data.about) items.push({ id: 'about', label: 'About' });
    if (data.skills && data.skills.length > 0) items.push({ id: 'skills', label: 'Skills' });
    if (data.services && data.services.length > 0) items.push({ id: 'services', label: 'Services' });
    if (data.portfolio && data.portfolio.length > 0) items.push({ id: 'portfolio', label: 'Portfolio' });
    if (data.testimonials && data.testimonials.length > 0) items.push({ id: 'testimonials', label: 'Testimonials' });
    if (data.blog) items.push({ id: 'blog', label: 'Blog' });
    if (data.about) items.push({ id: 'contact', label: 'Contact' });

    return items;
  }

  // Add click event listeners to all navigation buttons
  document.querySelectorAll('[data-scroll-to]').forEach(button => {
    button.addEventListener('click', () => {
      const sectionId = button.getAttribute('data-scroll-to');
      scrollToSection(sectionId);
    });
  });

  // Add click event listener to mobile menu button
  const mobileMenuButton = document.querySelector('.md\\:hidden');
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
      setIsMenuOpen(!isMenuOpen);
    });
  }

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

// Initialize template when DOM is loaded
document.addEventListener('DOMContentLoaded', initTemplate);

// Export functions for use in React component
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    serviceIcons,
    getIcon,
    renderStars,
    scrollToSection,
    initTemplate
  };
}