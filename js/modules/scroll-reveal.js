/**
 * ===================================
 * SCROLL REVEAL - Módulo JavaScript
 * ===================================
 * Automatiza la aparición fluida de elementos al hacer scroll.
 * Utiliza Intersection Observer para mayor performance.
 */

class ScrollReveal {
  constructor() {
    this.revealElements = document.querySelectorAll('.scroll-reveal');
    this.options = {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    };

    if (this.revealElements.length > 0) {
      this.init();
    }
  }

  init() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Añadir clase activa
            entry.target.classList.add('scroll-reveal--active');
            
            // Dejar de observar el elemento una vez revelado (una sola aparición)
            observer.unobserve(entry.target);
          }
        });
      }, this.options);

      // Registrar elementos en el observer
      this.revealElements.forEach(el => {
        observer.observe(el);
      });
    } else {
      // Fallback: Revelar todo de inmediato si no se soporta
      this.revealElements.forEach(el => {
        el.classList.add('scroll-reveal--active');
      });
    }
  }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScrollReveal;
} else {
  window.ScrollReveal = ScrollReveal;
}
