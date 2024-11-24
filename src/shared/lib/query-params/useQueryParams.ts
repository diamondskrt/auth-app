import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const queryParams = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  )

  const getQueryParam = useCallback(
    (key: string) => searchParams.get(key),
    [searchParams]
  )

  const updateQueryParams = useCallback(
    (params: Record<string, string | null | undefined>) => {
      const updatedParams = { ...queryParams }

      Object.entries(params).forEach(([key, value]) => {
        if (value == null) {
          delete updatedParams[key]
        } else {
          updatedParams[key] = value
        }
      })

      setSearchParams(updatedParams)
    },
    [setSearchParams, queryParams]
  )

  return {
    queryParams,
    getQueryParam,
    updateQueryParams,
  }
}
