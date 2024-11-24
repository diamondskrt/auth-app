import { useState, useMemo, useCallback, useEffect } from 'react'

import { useQueryParams } from '~/shared/lib/query-params'

import { PaginationProps } from '../model'

export function usePaginationActions({
  total = 0,
  initialPage = 1,
  perPage = 10,
}: PaginationProps) {
  const { queryParams, getQueryParam, updateQueryParams } = useQueryParams()

  const queryPage =
    parseInt(getQueryParam('page[number]') ?? '', 10) || initialPage
  const queryPerPage =
    parseInt(getQueryParam('page[size]') ?? '', 10) || perPage

  const [page, setPageState] = useState(queryPage)
  const [itemsPerPage, setPerPageState] = useState(queryPerPage)

  useEffect(() => {
    setPageState(queryPage)
    setPerPageState(queryPerPage)
  }, [queryPage, queryPerPage])

  const hasNextPage = useMemo(
    () => page * itemsPerPage < total,
    [page, itemsPerPage, total]
  )
  const hasPreviousPage = useMemo(() => page > 1, [page])

  const setPage = useCallback(
    (newPage: number) => {
      const safePage = Math.max(
        1,
        Math.min(newPage, Math.ceil(total / itemsPerPage))
      )
      setPageState(safePage)
      updateQueryParams({
        ...queryParams,
        'page[number]': safePage.toString(),
      })
    },
    [total, itemsPerPage, updateQueryParams, queryParams]
  )

  const setPerPage = useCallback(
    (newPerPage: number) => {
      setPerPageState(newPerPage)
      updateQueryParams({
        ...queryParams,
        'page[size]': newPerPage.toString(),
      })
    },
    [updateQueryParams, queryParams]
  )

  const nextPage = useCallback(() => {
    if (hasNextPage) setPage(page + 1)
  }, [hasNextPage, page, setPage])

  const previousPage = useCallback(() => {
    if (hasPreviousPage) setPage(page - 1)
  }, [hasPreviousPage, page, setPage])

  return {
    page,
    hasNextPage,
    hasPreviousPage,
    total,
    setPage,
    perPage: itemsPerPage,
    setPerPage,
    nextPage,
    previousPage,
  }
}
