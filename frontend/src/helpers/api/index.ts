import { traceSpan } from 'helpers/tracing'

export const apiFetch = async <T extends {}>(url: string, options?: RequestInit): Promise<T> => {
  if (options && options.method !== 'GET') {
    options.headers = Object.assign(options.headers || {}, {
      'Content-Type': 'application/json'
    })
  }

  return traceSpan(url, async () => {
    const response = await fetch(url, options)

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const text = await response.text()
      return Promise.resolve(text.length ? JSON.parse(text) : {})
    }

    return Promise.resolve(response)
  })
}
