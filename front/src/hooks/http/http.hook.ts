import { useState, useCallback } from 'react';
import { IHttpHook } from './interfaces';

export const useHttp = (): IHttpHook => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const request = useCallback( async(url: string,method: string = 'GET',body: any = null, headers: Record<string, string> = {})
  : Promise<any> => {
      setLoading(true)

      try {
        if (body) {
          body = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
        }

        const response = await fetch(url, {
          method,
          body,
          headers,
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong')
        }

        setLoading(false)
        return data
      } catch (e: any) {
        setLoading(false)
        setError(e.message)
        throw e
      }
    },
    []
  )

  const clearError = useCallback(() => setError(null), [])

  return { loading, request, error, clearError }
}