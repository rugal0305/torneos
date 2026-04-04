# Torneos Free Fire - Landing Page

Landing page profesional y estática para torneos de Free Fire. Diseñada con principios de accesibilidad, modularidad y soporte para navegadores antiguos.

## 🎯 Características

- ✨ **Diseño moderno con paleta OKLCH azul monocromática**
- 🎮 **Cursor personalizado luminoso** con efecto de blur y delay
- 📱 **Completamente responsive** (móvil, tablet, desktop)
- ♿ **Accesibilidad completa** (WCAG 2.1 AA)
- 🌐 **Soporte para navegadores antiguos** (IE9+)
- 📐 **Efecto Parallax** en sección hero
- 🎨 **HTML semántico** con etiquetas correctas
- 🚀 **Modularidad pragmática SOLID**
- 📦 **Estructura de archivos optimizada**

## 📁 Estructura de Carpetas

```
torneos-freefire/
├── index.html                 # Página principal
├── css/
│   ├── style.css             # Estilos globales e imports
│   ├── variables.css         # Paleta de colores OKLCH
│   ├── reset.css             # Reset y normalización
│   └── components/
│       ├── header.css        # Estilos del encabezado
│       ├── hero.css          # Sección hero con parallax
│       ├── button.css        # Estilos de botones
│       ├── luminic-cursor.css # Cursor personalizado
│       └── sections.css      # Secciones de contenido
├── js/
│   ├── script.js             # Script principal
│   ├── polyfills.js          # Polyfills para IE9+
│   └── modules/
│       ├── luminic-cursor.js # Módulo cursor luminoso
│       ├── parallax.js       # Módulo efecto parallax
│       └── header.js         # Módulo navegación

```

## 🎨 Sistema de Colores

Utilizamos **OKLCH** para una paleta monócroma azul perceptualmente uniforme:

```css
--color-primary-050: oklch(97% 0.04 258);    /* Azul muy claro */
--color-primary-100: oklch(94% 0.08 258);    /* Azul claro */
--color-primary-500: oklch(60% 0.28 259);    /* Azul principal */
--color-primary-900: oklch(25% 0.22 260);    /* Azul casi negro */
```

## 🖱️ Cursor Luminoso

El cursor personalizado cuenta con:
- Glow difuminado con `filter: blur(15px)`
- Delay suave mediante interpolación (`0.15s` para principal, `0.25s` para trail)
- Colores OKLCH que se adaptan al tema
- Fallback automático para navegadores sin soporte

```javascript
const luminicCursor = new LuminicCursor();
```

## ⚙️ Principios SOLID Implementados

1. **Single Responsibility**: Cada archivo CSS y JS tiene una responsabilidad única
2. **Open/Closed**: Estructura extensible sin modificar código existente
3. **Liskov Substitution**: Módulos intercambiables
4. **Interface Segregation**: Polyfills específicos por navegador
5. **Dependency Inversion**: Los módulos no dependen de implementaciones concretas

## ♿ Accesibilidad

- Etiquetas `<header>`, `<main>`, `<footer>`, `<article>`, `<section>`
- Atributos ARIA: `role`, `aria-label`, `aria-labelledby`, `aria-hidden`
- Navegación por teclado completa
- Focus visible en todos los elementos interactivos
- Uso de colores con suficiente contraste (WCAG AA)
- Soporte para `prefers-reduced-motion`
- Clase `.sr-only` para contenido solo de lectores de pantalla

## 🌐 Soporte de Navegadores

| Navegador | Versión |
|-----------|---------|
| Chrome | 60+ |
| Firefox | 55+ |
| Safari | 11+ |
| Edge | 79+ |
| IE | 9+ (con polyfills) |

### Polyfills Incluidos

- `requestAnimationFrame` (IE9)
- `Object.assign` (IE11)
- `Array.from` (IE11)
- `Element.prototype.closest` (IE11)

## 📊 Efecto Parallax

Se implementa mediante `data-parallax` attribute:

```html
<div class="hero-bg" data-parallax="0.5"></div>
```

El módulo `ParallaxEffect` calcula automáticamente la transformación basada en scroll.

## 🎯 Copywriting

El contenido está escrito para ser persuasivo sin caer en clichés:

- "No es casualidad. Es competencia pura." (Hero)
- "Este no es un torneo más" (Sección de torneo)
- Lenguaje directo y sin fluff
- Énfasis en competencia justa y comunidad

## 📱 Responsive

- **Header**: Se convierte a hamburguesa en <768px
- **Grid**: Se adapta automáticamente según pantalla
- **Tipografía**: Usa `clamp()` para escalado fluido
- **Botones**: Full-width en móvil

## 🚀 Optimizaciones

- Modularidad CSS (cascade mínimo)
- Prefetch de recursos externos
- Variables CSS para mantenibilidad
- Animaciones GPU-aceleradas (`will-change`)
- Minimal JavaScript (solo lo necesario)

## 🛠️ Instalación y Uso

1. Clona o descarga el proyecto
2. Abre `index.html` en tu navegador
3. ¡Listo! No necesita build process ni dependencias

## 💡 Notas de Desarrollo

- Los colores OKLCH se adaptan automáticamente a modo oscuro
- El cursor se desactiva automáticamente en dispositivos táctiles
- Los polyfills se cargan primero para garantizar compatibilidad
- Todo es vanilla JavaScript (sin frameworks)

## 📄 Licencia

GPL-3.0 - Libre para usar, modificar y distribuir.

---

**Hecho con ❤️ para la comunidad de Free Fire**
