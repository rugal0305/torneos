/**
 * ===================================
 * HEADER - Módulo JavaScript
 * ===================================
 * Gestiona el encabezado y navegación
 */

class Header {
  constructor() {
    this.header = document.querySelector('header');
    this.menuToggle = document.querySelector('.menu-toggle');
    this.nav = document.querySelector('nav');
    this.navLinks = document.querySelectorAll('nav a');
    
    if (this.header && this.menuToggle && this.nav) {
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

    // Efecto de scroll en header
    window.addEventListener('scroll', () => this.handleScroll());
  }

  toggleMenu() {
    this.menuToggle.classList.toggle('active');
    this.nav.classList.toggle('active');
  }

  closeMenu() {
    this.menuToggle.classList.remove('active');
    this.nav.classList.remove('active');
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
  }
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Header;
}
