/**
 * ===================================
 * EARNINGS CALCULATOR - Módulo JS
 * ===================================
 * Gestiona el simulador interactivo de ganancias por kills.
 * Multiplica dinámicamente según el país y número de bajas.
 */

class EarningsCalculator {
  constructor() {
    this.container = document.getElementById('earnings-calculator');
    if (!this.container) return;

    this.slider = document.getElementById('calc-kills-slider');
    this.displayVal = document.getElementById('calc-kills-val');
    this.earningsVal = document.getElementById('calc-earnings-val');
    this.btnCol = document.getElementById('calc-btn-col');
    this.btnMex = document.getElementById('calc-btn-mex');
    
    this.currentCountry = 'colombia'; // Por defecto
    this.killsValue = 1;

    this.pricing = {
      colombia: {
        perKill: 4000,
        currency: 'COP',
        format: (val) => `$${val.toLocaleString('es-CO')} COP`
      },
      mexico: {
        perKill: 20,
        currency: 'MXN',
        format: (val) => `$${val.toLocaleString('es-MX')} MXN`
      }
    };

    this.init();
  }

  init() {
    this.attachEventListeners();
    this.calculate();
  }

  attachEventListeners() {
    // Slider de Kills
    this.slider.addEventListener('input', (e) => {
      this.killsValue = parseInt(e.target.value);
      this.displayVal.textContent = this.killsValue;
      this.calculate();
    });

    // Botones de País
    if (this.btnCol && this.btnMex) {
      this.btnCol.addEventListener('click', () => this.setCountry('colombia'));
      this.btnMex.addEventListener('click', () => this.setCountry('mexico'));
    }
  }

  setCountry(country) {
    this.currentCountry = country;
    
    // Actualizar clases activas en los botones
    if (country === 'colombia') {
      this.btnCol.classList.add('active');
      this.btnMex.classList.remove('active');
    } else {
      this.btnMex.classList.add('active');
      this.btnCol.classList.remove('active');
    }

    this.calculate();
  }

  calculate() {
    const data = this.pricing[this.currentCountry];
    if (!data) return;

    const total = this.killsValue * data.perKill;
    this.earningsVal.textContent = data.format(total);

    // Animación de rebote sutil en el monto al cambiar
    this.earningsVal.classList.remove('animate-bounce-value');
    void this.earningsVal.offsetWidth; // Forzar reflow
    this.earningsVal.classList.add('animate-bounce-value');
  }
}

// Exportar
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EarningsCalculator;
} else {
  window.EarningsCalculator = EarningsCalculator;
}
