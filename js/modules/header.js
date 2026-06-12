/**
 * ===================================
 * HEADER - Módulo JavaScript
 * ===================================
 * Gestiona el encabezado y navegación
 */

class Header {
  constructor() {
    this.navBar = document.querySelector('nav'); // The sticky navbar
    this.menuToggle = document.getElementById('menu-toggle-btn');
    this.menuIcon = document.getElementById('menu-icon');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.navLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (this.menuToggle && this.mobileMenu) {
      this.init();
    }
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Toggle del menú móvil
    this.menuToggle.addEventListener('click', () => this.toggleMenu());

    // Cerrar menú al hacer clic en un enlace
    this.navLinks.forEach((link) => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Efecto de scroll en navbar
    if (this.navBar) {
      window.addEventListener('scroll', () => this.handleScroll());
    }
  }

  toggleMenu() {
    const isHidden = this.mobileMenu.classList.contains('hidden');
    if (isHidden) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  openMenu() {
    this.mobileMenu.classList.remove('hidden');
    this.menuToggle.setAttribute('aria-expanded', 'true');
    if (this.menuIcon) {
      this.menuIcon.textContent = 'close';
    }
  }

  closeMenu() {
    this.mobileMenu.classList.add('hidden');
    this.menuToggle.setAttribute('aria-expanded', 'false');
    if (this.menuIcon) {
      this.menuIcon.textContent = 'menu';
    }
  }

  handleScroll() {
    if (window.scrollY > 20) {
      this.navBar.classList.add('shadow-lg', 'bg-background/95');
      this.navBar.classList.remove('bg-background/90');
    } else {
      this.navBar.classList.remove('shadow-lg', 'bg-background/95');
      this.navBar.classList.add('bg-background/90');
    }
  }
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Header;
}
