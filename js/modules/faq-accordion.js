/**
 * ===================================
 * FAQ ACCORDION - Módulo JavaScript
 * ===================================
 * Gestiona la interactividad de las preguntas frecuentes.
 * Soporta navegación accesible y auto-cierre de paneles.
 */

class FaqAccordion {
  constructor() {
    this.accordion = document.querySelector('.faq-accordion');
    if (!this.accordion) return;

    this.items = Array.from(this.accordion.querySelectorAll('.accordion-item'));
    this.headers = Array.from(this.accordion.querySelectorAll('.accordion-header'));

    this.init();
  }

  init() {
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.headers.forEach(header => {
      header.addEventListener('click', () => this.toggleItem(header));
      
      // Soporte teclado (Enter / Space)
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleItem(header);
        }
      });
    });
  }

  toggleItem(clickedHeader) {
    const clickedItem = clickedHeader.closest('.accordion-item');
    const isExpanded = clickedHeader.getAttribute('aria-expanded') === 'true';

    // Cerrar todos los demás items (comportamiento de acordeón clásico de un solo canal)
    this.items.forEach(item => {
      if (item !== clickedItem) {
        item.classList.remove('active');
        const header = item.querySelector('.accordion-header');
        if (header) {
          header.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Cambiar estado del item cliqueado
    if (isExpanded) {
      clickedItem.classList.remove('active');
      clickedHeader.setAttribute('aria-expanded', 'false');
    } else {
      clickedItem.classList.add('active');
      clickedHeader.setAttribute('aria-expanded', 'true');
    }

    // Efecto de cursor luminoso
    if (typeof LuminicCursor !== 'undefined') {
      const cursorEl = document.querySelector('.luminic-cursor');
      if (cursorEl) {
        cursorEl.classList.add('active');
        setTimeout(() => cursorEl.classList.remove('active'), 200);
      }
    }
  }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FaqAccordion;
} else {
  window.FaqAccordion = FaqAccordion;
}
