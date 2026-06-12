/**
 * ===================================
 * REGISTRATION FORM - Módulo JavaScript
 * ===================================
 * Gestiona el formulario multipaso de inscripción,
 * validaciones en tiempo real, detalles dinámicos de pago,
 * copiado al portapapeles y redirección estructurada a WhatsApp.
 */

class RegistrationForm {
  constructor() {
    this.form = document.getElementById('tournament-registration-form');
    if (!this.form) return;

    // Pasos y navegación
    this.steps = Array.from(this.form.querySelectorAll('.form-step'));
    this.nextButtons = Array.from(this.form.querySelectorAll('.next-step-btn:not([type="submit"])'));
    this.prevButtons = Array.from(this.form.querySelectorAll('.prev-step-btn'));
    this.dots = Array.from(document.querySelectorAll('.step-dot'));
    this.progressBarFill = document.getElementById('form-progress-bar');
    
    // Campos dinámicos del Paso 2
    this.countrySelect = document.getElementById('player-country');
    this.tournamentSelect = document.getElementById('tournament-select');
    this.paymentSelect = document.getElementById('payment-method');
    this.paymentCard = document.getElementById('payment-details-card');
    this.priceValEl = document.getElementById('payment-price-value');
    this.copyNumberValEl = document.getElementById('copy-number-value');
    this.copyNumberLabelEl = document.getElementById('copy-number-label');
    this.ownerNameEl = document.getElementById('payment-owner-name');
    this.extraDetailRow = document.getElementById('payment-extra-detail-row');
    this.extraDetailVal = document.getElementById('payment-extra-detail-val');
    this.btnCopyAccount = document.getElementById('btn-copy-account');
    this.btnNextStep2 = document.getElementById('btn-next-step-2');
    
    // Quick copy buttons in pricing/account tables
    this.quickCopyButtons = Array.from(document.querySelectorAll('[data-copy-target]'));
    
    // Estado del formulario
    this.currentStep = 1;
    this.totalSteps = this.steps.length;

    // Datos financieros y cuentas autorizadas
    this.paymentData = {
      colombia: {
        currency: 'COP',
        priceDiario: '$12.000 COP',
        priceSemanal: '$20.000 COP',
        whatsappDest: '573207824209', // Javier Padilla
        methods: [
          {
            id: 'nequi',
            name: 'Nequi',
            accountLabel: 'Número Nequi',
            accountNumber: '3207824209',
            ownerName: 'Javier Padilla',
            extraLabel: 'Celular',
            extraVal: '3207824209'
          },
          {
            id: 'breve',
            name: 'Breve (Transferencias)',
            accountLabel: 'Llave Breve',
            accountNumber: '@3207824209',
            ownerName: 'Javier Padilla',
            extraLabel: 'Tipo Llave',
            extraVal: 'Celular'
          }
        ]
      },
      mexico: {
        currency: 'MXN',
        priceDiario: '$60 MXN',
        priceSemanal: '$100 MXN',
        whatsappDest: '529842140293', // Maria Diaz
        methods: [
          {
            id: 'bbva',
            name: 'BBVA / Transferencia',
            accountLabel: 'Tarjeta Débito (BBVA)',
            accountNumber: '4152314174139744',
            ownerName: 'Maria Diaz',
            extraLabel: 'Banco',
            extraVal: 'BBVA Bancomer'
          },
          {
            id: 'oxxo',
            name: 'OXXO Depósito',
            accountLabel: 'Tarjeta Débito (OXXO)',
            accountNumber: '4152314174139744',
            ownerName: 'Maria Diaz',
            extraLabel: 'Comisión',
            extraVal: 'Establecida por OXXO (~$15 MXN)'
          }
        ]
      }
    };

    this.init();
  }

  init() {
    this.attachEventListeners();
    this.updateProgressBar();
  }

  attachEventListeners() {
    // Botones Siguiente paso
    this.nextButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.validateStep(this.currentStep)) {
          this.goToStep(this.currentStep + 1);
        }
      });
    });

    // Botones Atrás
    this.prevButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.goToStep(this.currentStep - 1);
      });
    });

    // Escucha de cambio en País y Torneo (Paso 2)
    this.countrySelect.addEventListener('change', () => this.handleCountryChange());
    this.tournamentSelect.addEventListener('change', () => this.handlePaymentDependencies());
    this.paymentSelect.addEventListener('change', () => this.handlePaymentMethodChange());

    // Botón de Copiar Cuenta
    if (this.btnCopyAccount) {
      this.btnCopyAccount.addEventListener('click', () => this.copyAccountToClipboard());
    }

    // Botones de copia rápida en la tabla de precios
    this.quickCopyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-copy-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const valToCopy = targetEl.textContent.trim();
          this.copyTextToClipboard(valToCopy, btn);
        }
      });
    });

    // Envío del Formulario
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Remover errores visuales al escribir/cambiar inputs
    this.form.querySelectorAll('input, select').forEach(input => {
      input.addEventListener('input', () => this.clearInputError(input));
      input.addEventListener('change', () => this.clearInputError(input));
    });
  }

  // Navegar entre pasos
  goToStep(stepNum) {
    if (stepNum < 1 || stepNum > this.totalSteps) return;

    // Desvanecer el paso actual y mostrar el nuevo
    const currentStepEl = this.form.querySelector(`.form-step[data-step="${this.currentStep}"]`);
    const nextStepEl = this.form.querySelector(`.form-step[data-step="${stepNum}"]`);

    currentStepEl.classList.remove('active');
    currentStepEl.classList.add('hidden');
    
    nextStepEl.classList.remove('hidden');
    nextStepEl.classList.add('active');
    
    this.currentStep = stepNum;
    this.updateProgressBar();
    
    // Auto-scroll al formulario
    const scrollTarget = document.getElementById('registro-torneo');
    if (scrollTarget) {
      scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Actualiza los puntitos y la barra de progreso
  updateProgressBar() {
    // Actualizar barra de progreso
    const percentage = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
    if (this.progressBarFill) {
      this.progressBarFill.style.width = `${percentage}%`;
    }

    // Actualizar estados de los círculos (dots)
    this.dots.forEach(dot => {
      const stepVal = parseInt(dot.dataset.step);
      if (stepVal < this.currentStep) {
        dot.classList.add('completed');
        dot.classList.remove('active');
      } else if (stepVal === this.currentStep) {
        dot.classList.add('active');
        dot.classList.remove('completed');
      } else {
        dot.classList.remove('active', 'completed');
      }
    });
  }

  // Manejar el cambio de País
  handleCountryChange() {
    const country = this.countrySelect.value;
    
    // Vaciar y reiniciar selección de método de pago
    this.paymentSelect.innerHTML = '<option value="" disabled selected>Elige un método...</option>';
    this.paymentSelect.disabled = false;
    this.paymentCard.classList.add('hidden');
    this.btnNextStep2.disabled = true;

    if (this.paymentData[country]) {
      const methods = this.paymentData[country].methods;
      methods.forEach(method => {
        const option = document.createElement('option');
        option.value = method.id;
        option.textContent = method.name;
        this.paymentSelect.appendChild(option);
      });
    }
    
    this.handlePaymentDependencies();
  }

  // Controlar dependencias de precios y desbloqueos
  handlePaymentDependencies() {
    const country = this.countrySelect.value;
    const tournament = this.tournamentSelect.value;
    const method = this.paymentSelect.value;

    if (!country || !tournament) {
      this.paymentCard.classList.add('hidden');
      return;
    }

    // Calcular precio exacto a mostrar
    const countryData = this.paymentData[country];
    let priceText = '';
    if (tournament === 'duo_diario') {
      priceText = countryData.priceDiario;
    } else {
      priceText = countryData.priceSemanal;
    }

    this.priceValEl.textContent = priceText;

    if (method) {
      this.showPaymentCardDetails(country, method);
      this.btnNextStep2.disabled = false;
    }
  }

  // Manejar cambio en el método de pago seleccionado
  handlePaymentMethodChange() {
    const country = this.countrySelect.value;
    const method = this.paymentSelect.value;

    if (country && method) {
      this.showPaymentCardDetails(country, method);
      this.btnNextStep2.disabled = false;
    }
  }

  // Mostrar los detalles dinámicos en la tarjeta
  showPaymentCardDetails(country, methodId) {
    const countryData = this.paymentData[country];
    if (!countryData) return;

    const method = countryData.methods.find(m => m.id === methodId);
    if (!method) return;

    // Actualizar campos de texto en la tarjeta
    this.copyNumberLabelEl.textContent = method.accountLabel;
    this.copyNumberValEl.textContent = method.accountNumber;
    this.ownerNameEl.textContent = method.ownerName;

    // Campo extra si aplica
    if (method.extraVal) {
      this.extraDetailRow.classList.remove('hidden');
      this.extraDetailVal.textContent = `${method.extraLabel}: ${method.extraVal}`;
    } else {
      this.extraDetailRow.classList.add('hidden');
    }

    // Revelar la tarjeta de pago
    this.paymentCard.classList.remove('hidden');
    this.paymentCard.classList.add('animate-fadeIn');
    setTimeout(() => this.paymentCard.classList.remove('animate-fadeIn'), 500);
  }

  // Helper general para copiar al portapapeles con feedback
  copyTextToClipboard(text, btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => this.showCopyFeedback(btn))
        .catch(err => this.fallbackCopyText(text, btn));
    } else {
      this.fallbackCopyText(text, btn);
    }
  }

  // Función para copiar la cuenta del formulario
  copyAccountToClipboard() {
    const valToCopy = this.copyNumberValEl.textContent;
    this.copyTextToClipboard(valToCopy, this.btnCopyAccount);
  }

  fallbackCopyText(text, btn) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed'; // Evitar scroll
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      this.showCopyFeedback(btn);
    } catch (err) {
      console.error('Error al copiar texto: ', err);
    }
    document.body.removeChild(textArea);
  }

  showCopyFeedback(btn) {
    const originalText = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '<span class="material-symbols-outlined text-lg text-secondary-container">check</span>';
    
    // Efecto de cursor luminoso al copiar
    if (typeof LuminicCursor !== 'undefined') {
      const cursorEl = document.querySelector('.luminic-cursor');
      if (cursorEl) {
        cursorEl.classList.add('active');
        setTimeout(() => cursorEl.classList.remove('active'), 300);
      }
    }

    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = originalText;
    }, 2000);
  }

  // Validaciones del formulario
  validateStep(stepNum) {
    let isValid = true;
    const stepEl = this.form.querySelector(`.form-step[data-step="${stepNum}"]`);
    if (!stepEl) return false;

    // Buscar campos obligatorios requeridos del paso actual
    const requiredInputs = stepEl.querySelectorAll('input[required], select[required]');

    requiredInputs.forEach(input => {
      if (input.type === 'checkbox') {
        if (!input.checked) {
          this.showInputError(input);
          isValid = false;
        } else {
          this.clearInputError(input);
        }
      } else {
        if (!input.value.trim()) {
          this.showInputError(input);
          isValid = false;
        } else {
          this.clearInputError(input);
        }
      }
    });

    // Validaciones específicas
    if (stepNum === 1) {
      const waInput = document.getElementById('player1-whatsapp');
      if (waInput && waInput.value.trim()) {
        const cleaned = waInput.value.replace(/\D/g, '');
        if (cleaned.length < 7) {
          this.showInputError(waInput, 'El número de WhatsApp debe tener mínimo 7 dígitos.');
          isValid = false;
        }
      }
    }

    return isValid;
  }

  showInputError(input, customMsg = null) {
    const group = input.closest('.form-group') || input.closest('.checkbox-container');
    if (group) {
      group.classList.add('has-error');
      if (customMsg) {
        const errorTextEl = group.querySelector('.error-text');
        if (errorTextEl) errorTextEl.textContent = customMsg;
      }
    }
  }

  clearInputError(input) {
    const group = input.closest('.form-group') || input.closest('.checkbox-container');
    if (group) {
      group.classList.remove('has-error');
    }
  }

  // Procesar envío y generar link de WhatsApp
  handleSubmit(e) {
    e.preventDefault();

    // Validar el paso final (Paso 3)
    if (!this.validateStep(3)) {
      return;
    }

    // Recopilar valores
    const teamName = document.getElementById('team-name').value.trim();
    const p1Nick = document.getElementById('player1-nick').value.trim();
    const p1Whatsapp = document.getElementById('player1-whatsapp').value.trim();
    const p2Nick = document.getElementById('player2-nick').value.trim();
    const country = this.countrySelect.value;
    const countryLabel = this.countrySelect.options[this.countrySelect.selectedIndex].text;
    const tournamentVal = this.tournamentSelect.value;
    const tournamentLabel = this.tournamentSelect.options[this.tournamentSelect.selectedIndex].text;
    const paymentMethodVal = this.paymentSelect.value;
    const paymentMethodLabel = this.paymentSelect.options[this.paymentSelect.selectedIndex].text;
    const paymentRef = document.getElementById('payment-ref').value.trim();
    const priceText = this.priceValEl.textContent;

    // Número admin destino según país
    const destinationPhone = this.paymentData[country]?.whatsappDest || '573207824209';

    // Generar mensaje estructurado
    const formattedMsg = 
`🎮 *REGISTRO OFICIAL DE TORNEO* 🎮
----------------------------------
🏆 *Equipo:* ${teamName}
👤 *Jugador 1 (Líder):* ${p1Nick}
📱 *WhatsApp:* ${p1Whatsapp}
👤 *Jugador 2:* ${p2Nick}

🌎 *País:* ${countryLabel}
🎟️ *Torneo:* ${tournamentLabel}
💳 *Método de Pago:* ${paymentMethodLabel}
💵 *Monto Total:* ${priceText}
🔢 *ID Pago / Titular:* ${paymentRef}
----------------------------------
📌 *¡Hola! He completado el formulario de inscripción y tengo mi captura de pago lista para enviarte.*`;

    // Codificar URL para WhatsApp
    const encodedText = encodeURIComponent(formattedMsg);
    const whatsappUrl = `https://wa.me/${destinationPhone}?text=${encodedText}`;

    // Efecto de retroalimentación exitosa
    const btnSubmit = document.getElementById('btn-submit-form');
    const originalText = btnSubmit.innerHTML;
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '⚡ Registrando cupo...';

    setTimeout(() => {
      btnSubmit.innerHTML = '🎯 ¡Registro completado!';
      
      // Abrir WhatsApp en pestaña nueva
      window.open(whatsappUrl, '_blank');
      
      // Restaurar botón después de unos segundos
      setTimeout(() => {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalText;
        
        // Resetear el formulario y volver al paso 1
        this.form.reset();
        this.paymentCard.classList.add('hidden');
        this.paymentSelect.disabled = true;
        this.goToStep(1);
      }, 4000);
    }, 1200);
  }
}

// Exportar para que script.js pueda importarlo
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RegistrationForm;
} else {
  window.RegistrationForm = RegistrationForm;
}
