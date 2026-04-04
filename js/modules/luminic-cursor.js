/**
 * ===================================
 * CURSOR LUMINOSO - Módulo JavaScript
 * ===================================
 * Crea un efecto de cursor personalizado difuminado
 * con trail y delay usando OKLCH
 */

class LuminicCursor {
  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.cursorX = 0;
    this.cursorY = 0;
    this.trailX = 0;
    this.trailY = 0;
    this.delay = 0.15;
    this.trailDelay = 0.25;
    this.isSupported = this.checkSupport();
    
    if (this.isSupported) {
      this.init();
    }
  }

  checkSupport() {
    return !('ontouchstart' in window) && window.matchMedia('(hover: hover)').matches;
  }

  init() {
    this.createCursor();
    this.attachEventListeners();
    this.animate();
  }

  createCursor() {
    // Cursor principal
    this.cursor = document.createElement('div');
    this.cursor.className = 'luminic-cursor';
    this.cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(this.cursor);

    // Trail (rastro)
    this.trail = document.createElement('div');
    this.trail.className = 'luminic-cursor--trail';
    this.trail.setAttribute('aria-hidden', 'true');
    document.body.appendChild(this.trail);
  }

  attachEventListeners() {
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    document.addEventListener('mouseenter', () => this.handleMouseEnter());
    document.addEventListener('mouseleave', () => this.handleMouseLeave());
    
    // Botones y enlaces
    document.addEventListener('click', (e) => {
      if (e.target.closest('button, a, [role="button"]')) {
        this.cursor.classList.add('active');
        setTimeout(() => this.cursor.classList.remove('active'), 150);
      }
    });
  }

  handleMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  handleMouseEnter() {
    if (this.cursor) {
      this.cursor.style.opacity = '0.9';
    }
    if (this.trail) {
      this.trail.style.opacity = '0.5';
    }
  }

  handleMouseLeave() {
    if (this.cursor) {
      this.cursor.style.opacity = '0';
    }
    if (this.trail) {
      this.trail.style.opacity = '0';
    }
  }

  animate() {
    // Aplicar delay suave al cursor principal
    this.cursorX += (this.mouseX - this.cursorX) * this.delay;
    this.cursorY += (this.mouseY - this.cursorY) * this.delay;

    // Aplicar delay mayor al trail
    this.trailX += (this.mouseX - this.trailX) * this.trailDelay;
    this.trailY += (this.mouseY - this.trailY) * this.trailDelay;

    // Actualizar posiciones
    if (this.cursor) {
      this.cursor.style.transform = `
        translate(
          calc(${this.cursorX}px - 50%),
          calc(${this.cursorY}px - 50%)
        )
      `;
    }

    if (this.trail) {
      this.trail.style.transform = `
        translate(
          calc(${this.trailX}px - 50%),
          calc(${this.trailY}px - 50%)
        )
      `;
    }

    requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.cursor) this.cursor.remove();
    if (this.trail) this.trail.remove();
  }
}

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LuminicCursor;
}
