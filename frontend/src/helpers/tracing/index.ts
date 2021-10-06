import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { Resource } from '@opentelemetry/resources'
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base'
import { CollectorTraceExporter } from '@opentelemetry/exporter-collector'
import { ZoneContextManager } from '@opentelemetry/context-zone'
import { Span } from '@opentelemetry/api'

const resource = new Resource({ 'service.name': 'person-service-frontend' })
const provider = new WebTracerProvider({ resource })

const collector = new CollectorTraceExporter({ url: '/api/tempo/v1/trace' })
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))
provider.addSpanProcessor(new SimpleSpanProcessor(collector))
provider.register({ contextManager: new ZoneContextManager() })

const webTracerWithZone = provider.getTracer('person-service-frontend')

export const startSpan = (name: string): Span => webTracerWithZone.startSpan(name)
