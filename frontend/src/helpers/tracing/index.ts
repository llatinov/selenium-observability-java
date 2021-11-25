import { context, trace, Span, SpanStatusCode } from '@opentelemetry/api'
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { Resource } from '@opentelemetry/resources'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { CollectorTraceExporter } from '@opentelemetry/exporter-collector'
import { ZoneContextManager } from '@opentelemetry/context-zone'
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'
import { FetchError } from '@opentelemetry/instrumentation-fetch/build/src/types'
import { registerInstrumentations } from '@opentelemetry/instrumentation'

import { tracingUrl } from 'helpers/config'

const resource = new Resource({ 'service.name': 'person-service-frontend' })
const provider = new WebTracerProvider({ resource })

const collector = new CollectorTraceExporter({ url: tracingUrl })
provider.addSpanProcessor(new SimpleSpanProcessor(collector))
provider.register({ contextManager: new ZoneContextManager() })

const webTracerWithZone = provider.getTracer('person-service-frontend')

declare const window: any
var bindingSpan: Span | undefined

window.startBindingSpan = (traceId: string, spanId: string, traceFlags: number) => {
  bindingSpan = webTracerWithZone.startSpan('')
  bindingSpan.spanContext().traceId = traceId
  bindingSpan.spanContext().spanId = spanId
  bindingSpan.spanContext().traceFlags = traceFlags
}

window.flushTraces = () => {
  provider.activeSpanProcessor.forceFlush().then(() => console.log('flushed'))
}

registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: ['/.*/g'],
      clearTimingResources: true,
      applyCustomAttributesOnSpan: (span: Span, request: Request | RequestInit, result: Response | FetchError) => {
        const attributes = (span as any).attributes
        if (attributes.component === 'fetch') {
          span.updateName(`${attributes['http.method']} ${attributes['http.url']}`)
        }
        if (result.status && result.status > 299) {
          span.setStatus({ code: SpanStatusCode.ERROR })
        }
      }
    })
  ]
})

export function traceSpan<F extends (...args: any) => ReturnType<F>>(name: string, func: F): ReturnType<F> {
  var singleSpan: Span
  if (bindingSpan) {
    const ctx = trace.setSpan(context.active(), bindingSpan)
    singleSpan = webTracerWithZone.startSpan(name, undefined, ctx)
    bindingSpan = undefined
  } else {
    singleSpan = webTracerWithZone.startSpan(name)
  }
  return context.with(trace.setSpan(context.active(), singleSpan), () => {
    try {
      const result = func()
      singleSpan.end()
      return result
    } catch (error) {
      singleSpan.setStatus({ code: SpanStatusCode.ERROR })
      singleSpan.end()
      throw error
    }
  })
}
