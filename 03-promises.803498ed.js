!function(){function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},t={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in t){var n=t[e];delete t[e];var i={id:e,exports:{}};return o[e]=i,n.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},n.parcelRequired7c6=i);var r=i("iU1Pc"),u=(document.querySelector(".form"),document.querySelector("input[name = delay]").value),c=document.querySelector("input[name = step]").value,a=document.querySelector("input[name = amount]").value,l=document.querySelector("button[type = submit]"),d={position:position,delay:u};function f(e,n){var o=Math.random()>.3;return d.position=e,d.delay=n,new Promise((function(e,n){o?e(d):n(d)}))}f(2,1500).then((function(n){var o=n.position,t=n.delay;e(r).Notify.success("✅ Fulfilled promise ".concat(o," in ").concat(t,"ms"))})).catch((function(n){var o=n.position,t=n.delay;e(r).Notify.failure("❌ Rejected promise ".concat(o," in ").concat(t,"ms"))})),l.addEventListener("click",(function(){for(var e=1;e<=a;e+=1)f(),u+=c}))}();
//# sourceMappingURL=03-promises.803498ed.js.map
