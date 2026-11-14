'use strict'

/**
 * Node.js 27+ changed `http.IncomingMessage.prototype.headers` to use a
 * null-prototype object (`{ __proto__: null }`), removing `.hasOwnProperty`.
 * Next.js 16 still calls `headers.hasOwnProperty(...)` in
 * `checkIsOnDemandRevalidate` on incoming requests.
 *
 * On Node <= 26 (where `headers.hasOwnProperty` already exists), this module
 * is a strict no-op. On Node 27+, it attaches a minimal null-prototype shim
 * exposing only a non-enumerable `hasOwnProperty` method.
 */
const http = require('node:http')

const PATCHED_SYMBOL = Symbol.for('nextjs-personal.node27-http-headers-compat')

if (!globalThis[PATCHED_SYMBOL]) {
  globalThis[PATCHED_SYMBOL] = true

  const probe = new http.IncomingMessage(null)
  if (probe.headers && typeof probe.headers.hasOwnProperty !== 'function') {
    const HeaderCompatProto = Object.create(null, {
      hasOwnProperty: {
        value: Object.prototype.hasOwnProperty,
        writable: true,
        enumerable: false,
        configurable: true,
      },
    })

    const ensureHeadersCompat = (obj) => {
      if (obj && typeof obj === 'object' && Object.getPrototypeOf(obj) === null) {
        Object.setPrototypeOf(obj, HeaderCompatProto)
      }
    }

    const origAddHeaderLine = http.IncomingMessage.prototype._addHeaderLine
    if (typeof origAddHeaderLine === 'function') {
      http.IncomingMessage.prototype._addHeaderLine = function _addHeaderLineCompat(
        field,
        value,
        dest
      ) {
        ensureHeadersCompat(dest)
        return origAddHeaderLine.call(this, field, value, dest)
      }
    }

    const origEmit = http.Server.prototype.emit
    http.Server.prototype.emit = function emitCompat(event, ...args) {
      if ((event === 'request' || event === 'upgrade') && args[0]?.headers) {
        ensureHeadersCompat(args[0].headers)
      }
      return origEmit.apply(this, [event, ...args])
    }
  }
}
