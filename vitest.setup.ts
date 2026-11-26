import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

// Sin `globals: true`, Testing Library no limpia sola: se desmonta tras cada prueba.
afterEach(() => {
  cleanup()
})

// Polyfills de jsdom que necesitan los primitivos de Radix (Select, ToggleGroup,
// Tooltip) para poder renderizarse e interactuar en las pruebas.
if (typeof Element !== "undefined") {
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = () => {}
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {}
  }
}

if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}
