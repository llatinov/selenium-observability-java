import { context, trace, Span } from '@opentelemetry/api'
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { Resource } from '@opentelemetry/resources'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { CollectorTraceExporter } from '@opentelemetry/exporter-collector'
import { ZoneContextManager } from '@opentelemetry/context-zone'
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'
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
      clearTimingResources: true
    })
  ]
})

export function traceSpan<F extends (...args: any) => ReturnType<F>>(name: string, fn: F): ReturnType<F> {
  var singleSpan
  if (bindingSpan) {
    const ctx = trace.setSpan(context.active(), bindingSpan)
    singleSpan = webTracerWithZone.startSpan(name, undefined, ctx)
    bindingSpan = undefined
  } else {
    singleSpan = webTracerWithZone.startSpan(name)
  }
  const result = context.with(trace.setSpan(context.active(), singleSpan), fn)
  singleSpan.end()
  return result
}
