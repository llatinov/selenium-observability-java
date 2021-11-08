import { context, trace } from '@opentelemetry/api'
import { initTracer } from './init_tracing'

const webTracerWithZone = initTracer('cypress-tests-overwrite')

var mainSpan = undefined
var currentSpan = undefined
var mainWindow

function initTracing(name) {
  mainSpan = webTracerWithZone.startSpan(name)
  currentSpan = mainSpan
  trace.setSpan(context.active(), mainSpan)
  mainSpan.end()
}

function initWindow(window) {
  mainWindow = window
}

function createChildSpan(name) {
  const ctx = trace.setSpan(context.active(), currentSpan)
  const span = webTracerWithZone.startSpan(name, undefined, ctx)
  trace.setSpan(context.active(), span)
  return span
}

Cypress.Commands.add('initTracing', name => initTracing(name))

Cypress.Commands.add('initWindow', window => initWindow(window))

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  currentSpan = mainSpan
  const span = createChildSpan(`visit: ${url}`)
  currentSpan = span
  const result = originalFn(url, options)
  span.end()
  return result
})

Cypress.Commands.overwrite('get', (originalFn, selector, options) => {
  const span = createChildSpan(`get: ${selector}`)
  currentSpan = span
  const result = originalFn(selector, options)
  span.end()
  mainWindow.startBindingSpan(span.spanContext().traceId, span.spanContext().spanId, span.spanContext().traceFlags)
  return result
})

Cypress.Commands.overwrite('click', (originalFn, subject, options) => {
  const span = createChildSpan(`click: ${subject.selector}`)
  const result = originalFn(subject, options)
  span.end()
  return result
})

Cypress.Commands.overwrite('type', (originalFn, subject, text, options) => {
  const span = createChildSpan(`type: ${text}`)
  const result = originalFn(subject, text, options)
  span.end()
  return result
})
