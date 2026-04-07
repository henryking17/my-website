// Portfolio data
const portfolioItems = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern full-stack e-commerce solution with seamless checkout experience and advanced analytics.',
    tags: ['React', 'Node.js', 'MongoDB'],
    icon: 'globe',
    color: 'from-blue-600 to-blue-400'
  },
  {
    id: 2,
    title: 'Design System',
    description: 'Comprehensive UI component library with accessibility-first approach and extensive documentation.',
    tags: ['TypeScript', 'Tailwind', 'Storybook'],
    icon: 'palette',
    color: 'from-purple-600 to-pink-500'
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates and team collaboration features.',
    tags: ['Next.js', 'Prisma', 'Socket.io'],
    icon: 'code-2',
    color: 'from-emerald-600 to-teal-500'
  },
  {
    id: 4,
    title: 'AI Dashboard',
    description: 'Analytics dashboard with machine learning insights, advanced visualizations, and real-time data.',
    tags: ['Python', 'TensorFlow', 'D3.js'],
    icon: 'sparkles',
    color: 'from-amber-600 to-orange-500'
  }
];

// Social links data
const socialLinks = [
  { name: 'GitHub', icon: 'github', url: 'https://github.com', color: 'github' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com', color: 'linkedin' },
  { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com', color: 'twitter' },
  { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com', color: 'instagram' },
  { name: 'Email', icon: 'mail', url: 'mailto:henrycyprain2@gmail.com', color: 'email' }
];

// Icon mapping
const iconMap = {
  'globe': 'globe',
  'palette': 'palette',
  'code-2': 'code2',
  'sparkles': 'sparkles',
  'github': 'github',
  'linkedin': 'linkedin',
  'twitter': 'twitter',
  'instagram': 'instagram',
  'mail': 'mail',
  'external-link': 'externalLink',
  'chevron-down': 'chevronDown'
};

// Helper function to render Lucide icon
function renderIcon(iconName, className = 'w-5 h-5') {
  const lucide = window.lucide;
  const iconKey = Object.keys(lucide).find(
    key => key.toLowerCase() === iconName.toLowerCase() || 
            key === iconMap[iconName]
  );
  
  if (iconKey) {
    const element = document.createElement('div');
    return lucide[iconKey].toSvg({ class: className });
  }
  return '';
}

// Helper function to get icon SVG as HTML string
function getIconSVG(iconName, className = 'w-5 h-5') {
  const lucide = window.lucide;
  let iconKey;
  
  // Try to find the icon by name
  for (const key in lucide) {
    if (key.toLowerCase() === iconName.toLowerCase()) {
      iconKey = key;
      break;
    }
  }
  
  if (iconKey && lucide[iconKey]) {
    try {
      return lucide[iconKey].toSvg({ class: className });
    } catch (e) {
      console.error('Error rendering icon:', iconName);
      return '';
    }
  }
  return '';
}

// App state
let scrolled = false;
let visibleSections = new Set();

// Scroll detection
function initScrollDetection() {
  window.addEventListener('scroll', () => {
    scrolled = window.scrollY > 50;
    updateNavbar();
  }, { passive: true });
}

// Update navbar styling based on scroll
function updateNavbar() {
  const nav = document.querySelector('nav');
  if (scrolled) {
    nav.classList.add('glass', 'border-b');
    nav.classList.remove('py-5');
    nav.classList.add('py-3');
  } else {
    nav.classList.remove('glass', 'border-b');
    nav.classList.add('py-5');
    nav.classList.remove('py-3');
  }
}

// Intersection Observer for section animations
function initIntersectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.add(entry.target.id);
          
          // Add animation classes to child elements
          const animatedElements = entry.target.querySelectorAll('[data-animate]');
          animatedElements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('animate-fade-in-up');
            }, index * 50);
          });
          
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section);
  });
}

// Smooth scroll to section
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Render portfolio cards
function renderPortfolioCards() {
  const gridContainer = document.getElementById('portfolio-grid');
  
  gridContainer.innerHTML = portfolioItems.map((item, index) => `
    <button 
      class="card group overflow-hidden border-0 shadow-sm hover-lift cursor-pointer opacity-0 stagger-${Math.min(index + 1, 5)} w-full text-left transition-all duration-300 active:scale-95" 
      data-animate
      data-portfolio-id="${item.id}"
      type="button"
    >
      <div class="bg-gradient-to-br ${item.color} p-8 text-white">
        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-white/30 transition-all">
          ${getIconSVG(item.icon, 'w-7 h-7 text-white')}
        </div>
        <h3 class="text-2xl font-bold mb-3 text-white">${item.title}</h3>
        <p class="text-white/90 text-sm leading-relaxed">${item.description}</p>
      </div>
      
      <div class="p-6 bg-card">
        <div class="flex items-center justify-between">
          <div class="flex flex-wrap gap-2">
            ${item.tags.map(tag => `
              <span class="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                ${tag}
              </span>
            `).join('')}
          </div>
          <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
            ${getIconSVG('externalLink', 'w-5 h-5')}
          </div>
        </div>
      </div>
    </button>
  `).join('');
}

// Render social links
function renderSocialLinks() {
  const socialContainer = document.getElementById('social-links');
  
  socialContainer.innerHTML = socialLinks.map((social) => `
    <a
      href="${social.url}"
      target="_blank"
      rel="noopener noreferrer"
      class="social-link ${social.color} flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300"
      data-animate
    >
      ${getIconSVG(social.icon, 'w-5 h-5')}
      <span class="font-medium">${social.name}</span>
    </a>
  `).join('');
}

// Initialize app
function initApp() {
  const root = document.getElementById('root');
  
  const htmlContent = `
    <div class="min-h-screen bg-background">
      <!-- Navigation -->
      <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5 border-border/50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            <button 
              class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-70 transition-opacity nav-link"
              data-section="hero"
            >
              CH
            </button>
            <div class="flex items-center gap-8">
              <button 
                class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors nav-link"
                data-section="portfolio"
              >
                Portfolio
              </button>
              <button 
                class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors nav-link"
                data-section="socials"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section 
        id="hero" 
        class="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8 pt-20"
      >
        <div class="max-w-4xl mx-auto text-center">
          <!-- Greeting -->
          <div class="opacity-0 stagger-0" data-animate>
            <div class="badge secondary mb-8 px-5 py-2 text-xs font-semibold">
              Welcome to my portfolio
            </div>
          </div>

          <!-- Name -->
          <h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 opacity-0 stagger-1" data-animate>
            <span class="gradient-text">Cyprain</span>
            <br />
            <span class="text-foreground">Henry</span>
          </h1>

          <!-- Tagline -->
          <p class="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 opacity-0 stagger-2 leading-relaxed" data-animate>
            Creative developer crafting beautiful digital experiences. 
            Passionate about clean code, elegant design, and building products that matter.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 stagger-3" data-animate>
            <button 
              class="btn btn-primary btn-lg rounded-full px-10 nav-link font-semibold"
              data-section="portfolio"
            >
              View My Work
            </button>
            <button 
              class="btn btn-outline btn-lg rounded-full px-10 nav-link font-semibold"
              data-section="socials"
            >
              Get in Touch
            </button>
          </div>
        </div>

        <!-- Scroll indicator -->
        <button 
          class="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors opacity-0 stagger-5 nav-link animate-bounce"
          data-section="portfolio"
        >
          ${getIconSVG('chevronDown', 'w-6 h-6')}
        </button>
      </section>

      <!-- Portfolio Section -->
      <section 
        id="portfolio" 
        class="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/20"
      >
        <div class="max-w-6xl mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-20 opacity-0" data-animate>
            <div class="badge outline mb-6">Featured Work</div>
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              My Recent Projects
            </h2>
            <p class="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              A collection of carefully crafted projects showcasing my expertise in design, development, and problem-solving.
            </p>
          </div>

          <!-- Portfolio Grid -->
          <div id="portfolio-grid" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Cards will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Socials Section -->
      <section 
        id="socials" 
        class="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/30 to-background"
      >
        <div class="max-w-4xl mx-auto text-center">
          <!-- Section Header -->
          <div class="mb-16 opacity-0" data-animate>
            <div class="badge outline mb-6">Get in Touch</div>
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Let's Connect
            </h2>
            <p class="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              I'm always interested in discussing new projects, creative opportunities, and ways to collaborate on building amazing products.
            </p>
          </div>

          <!-- Social Links -->
          <div id="social-links" class="flex flex-wrap justify-center gap-5 mb-16 opacity-0 stagger-1" data-animate>
            <!-- Links will be rendered here -->
          </div>

          <!-- Email CTA -->
          <div class="opacity-0 stagger-2" data-animate>
            <p class="text-muted-foreground mb-6 text-lg">Or feel free to reach out directly</p>
            <a 
              href="mailto:henrycyprain2@example.com"
              class="inline-flex items-center gap-3 text-lg font-semibold text-primary hover:underline hover:text-primary/80 transition-colors"
            >
              ${getIconSVG('mail', 'w-6 h-6')}
              henrycyprain2@example.com
            </a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/50">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <p class="text-sm font-medium text-muted-foreground">
              © ${new Date().getFullYear()} Cyprain Henry. All rights reserved.
            </p>
            <p class="text-sm font-medium text-muted-foreground">
              Built with Vanilla JavaScript, Tailwind CSS & Lucide Icons
            </p>
          </div>
        </div>
      </footer>
    </div>
  `;
  
  root.innerHTML = htmlContent;
  
  // Attach event listeners
  attachEventListeners();
  
  // Render content
  renderPortfolioCards();
  renderSocialLinks();
  
  // Initialize animations
  initIntersectionObserver();
  
  // Wait for animations to be ready
  setTimeout(() => {
    const heroElements = document.querySelectorAll('#hero [data-animate]');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-fade-in-up');
      }, index * 100);
    });
  }, 100);
}

// Attach event listeners
function attachEventListeners() {
  // Navigation links and navigation buttons
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      if (section) {
        scrollToSection(section);
      }
    });
    // Add pointer cursor to all nav links
    link.style.cursor = 'pointer';
  });
  
  // Portfolio card buttons
  document.querySelectorAll('[data-portfolio-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const portfolioId = card.getAttribute('data-portfolio-id');
      const portfolio = portfolioItems.find(item => item.id == portfolioId);
      if (portfolio) {
        // Log the clicked portfolio for potential future integration
        console.log('Portfolio item clicked:', portfolio);
        // You can add custom handling here (e.g., open a modal, navigate to detail page, etc.)
      }
    });
    card.style.cursor = 'pointer';
  });
  
  // Social links (they're already <a> tags, but ensure they're interactive)
  document.querySelectorAll('.social-link').forEach(link => {
    link.style.cursor = 'pointer';
  });
  
  // All buttons
  document.querySelectorAll('button').forEach(button => {
    button.style.cursor = 'pointer';
  });
  
  // All links
  document.querySelectorAll('a').forEach(link => {
    link.style.cursor = 'pointer';
  });
}

// Initialize scroll detection
function init() {
  initScrollDetection();
  initApp();
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Fallback in case DOMContentLoaded has already fired
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
