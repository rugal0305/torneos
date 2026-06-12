/**
 * ===================================
 * SCRIPT PRINCIPAL
 * ===================================
 * Inicializa todos los módulos de la aplicación
 */

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar cursor luminoso
  const luminicCursor = new LuminicCursor();

  // Inicializar efecto parallax
  const parallaxEffect = new ParallaxEffect();

  // Inicializar header
  const header = new Header();

  // Inicializar formulario de registro
  const registrationForm = new RegistrationForm();

  // Inicializar calculadora de ganancias
  const earningsCalculator = new EarningsCalculator();

  // Inicializar acordeón FAQ
  const faqAccordion = new FaqAccordion();

  // Inicializar efectos al scroll (reveal)
  const scrollReveal = new ScrollReveal();

  // Log de inicialización (solo en desarrollo)
  if (typeof console !== 'undefined' && console.log) {
    console.log('🎮 Torneos Free Fire - Aplicación Iniciada');
  }
});

// Manejo de errores global
window.addEventListener('error', function(event) {
  console.error('Error:', event.error);
});

// Service Worker (opcional para PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    // Descomentar cuando se implemente service worker
    // navigator.serviceWorker.register('/sw.js');
  });
}
