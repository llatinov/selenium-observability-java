import { context, trace } from '@opentelemetry/api'
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { startSpan } from 'helpers/tracing'

registerInstrumentations({
  instrumentations: [
    new FetchInstrumentation({
      propagateTraceHeaderCorsUrls: ['/.*/g'],
      clearTimingResources: true
    })
  ]
})

export const apiFetch = async <T extends {}>(url: string, options?: RequestInit): Promise<T> => {
  if (options && options.method !== 'GET') {
    options.headers = Object.assign(options.headers || {}, {
      'Content-Type': 'application/json'
    })
  }

  const singleSpan = startSpan(url)

  return context.with(trace.setSpan(context.active(), singleSpan), async () => {
    const response = await fetch(url, options)

    singleSpan.end()

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text()
      return Promise.resolve(text.length ? JSON.parse(text) : {})
    }

    return Promise.resolve(response)
  })
}
