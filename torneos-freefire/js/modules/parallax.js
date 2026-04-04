/**
 * ===================================
 * EFECTO PARALLAX - Módulo JavaScript
 * ===================================
 * Crea efecto de parallax en secciones del sitio
 */

class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.speed = 0.5;
    
    if (this.elements.length > 0) {
      this.init();
    }
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const scrollPos = window.scrollY;

    this.elements.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || this.speed;
      const yPos = scrollPos * speed;
      
      el.style.transform = `translateY(${yPos}px)`;
    });
  }
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ParallaxEffect;
}
