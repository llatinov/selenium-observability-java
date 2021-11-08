import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { Resource } from '@opentelemetry/resources'
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { CollectorTraceExporter } from '@opentelemetry/exporter-collector'
import { ZoneContextManager } from '@opentelemetry/context-zone'

export function initTracer(name) {
  const resource = new Resource({ 'service.name': name })
  const provider = new WebTracerProvider({ resource })

  const collector = new CollectorTraceExporter({ url: 'http://localhost:4318/v1/trace' })
  provider.addSpanProcessor(new SimpleSpanProcessor(collector))
  provider.register({ contextManager: new ZoneContextManager() })

  return provider.getTracer(name)
}
