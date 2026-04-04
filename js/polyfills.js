/**
 * ===================================
 * POLYFILLS Y SOPORTE PARA NAVEGADORES ANTIGUOS
 * ===================================
 */

// Polyfill para requestAnimationFrame (IE9)
(function() {
  let lastTime = 0;
  const vendors = ['ms', 'moz', 'webkit', 'o'];
  
  for(let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                                  || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}());

// Polyfill para Object.assign (IE11)
if (typeof Object.assign !== 'function') {
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      'use strict';
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      const to = Object(target);

      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

// Polyfill para Array.from (IE11)
if (!Array.from) {
  Array.from = (function() {
    const toStr = Object.prototype.toString;
    const isCallable = function(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    return function from(arrayLike/*, mapFn, thisArg */) {
      const C = this;
      const items = Object(arrayLike);

      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      const mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      let T;

      if (typeof mapFn !== 'undefined') {
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      let len = parseInt(items.length) || 0;
      if (len === 0) return [];

      const A = isCallable(C) ? Object(new C(len)) : new Array(len);

      for (let k = 0; k < len; k++) {
        const kValue = items[k];
        const mappedValue = typeof mapFn === 'undefined' ? kValue : typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        Object.defineProperty(A, k, {
          value: mappedValue,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
      A.length = len;
      return A;
    };
  }()); 
}

// Polyfill para Element.prototype.closest (IE11)
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    let el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement;
    } while (el);
    return null;
  };
}

// Polyfill para Element.prototype.matches (IE9)
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
