import { context, trace } from '@opentelemetry/api'
import { initTracer } from './init_tracing'

export default class TracingCypress {
  constructor() {
    this.webTracerWithZone = initTracer('cypress-tests-wrapper')
    this.mainSpan = undefined
    this.currentSpan = undefined
  }

  _createChildSpan(name) {
    const ctx = trace.setSpan(context.active(), this.currentSpan)
    const span = this.webTracerWithZone.startSpan(name, undefined, ctx)
    trace.setSpan(context.active(), span)
    return span
  }

  initTracing(name) {
    this.mainSpan = this.webTracerWithZone.startSpan(name)
    this.currentSpan = this.mainSpan
    trace.setSpan(context.active(), this.mainSpan)
    this.mainSpan.end()
  }

  visit(url, options) {
    this.currentSpan = this.mainSpan
    const span = this._createChildSpan(`visit: ${url}`)
    this.currentSpan = span
    const result = cy.visit(url, options)
    span.end()
    return result
  }

  get(selector, options) {
    const span = this._createChildSpan(`get: ${selector}`)
    this.currentSpan = span
    const result = cy.get(selector, options)
    span.end()
    return result
  }

  click(subject, options) {
    const span = this._createChildSpan('click')
    subject.then(element =>
      element[0].ownerDocument.defaultView.startBindingSpan(
        span.spanContext().traceId,
        span.spanContext().spanId,
        span.spanContext().traceFlags
      )
    )
    const result = subject.click(options)
    span.end()
    return result
  }

  type(subject, text, options) {
    const span = this._createChildSpan(`type: ${text}`)
    const result = subject.type(text, options)
    span.end()
    return result
  }
}
