import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'

import { useGetAbilityGroupList } from '~/shared/api/ability-group'
import { useQueryParams } from '~/shared/lib/query-params'

export function useUserFilterActions() {
  const {
    data: abilityGroupListData,
    isPending: isGetAbilityGroupListPending,
    isError: isGetAbilityGroupListError,
    error: getAbilityGroupListError,
  } = useGetAbilityGroupList()

  const { queryParams, getQueryParam, updateQueryParams, clearQueryParams } =
    useQueryParams()

  const searchQuery = getQueryParam('filter[usernameLike]') || ''
  const roleQuery = getQueryParam('filter[abilityGroups][id]') || ''
  const sortQuery = getQueryParam('sort') || ''

  const onUpdateQueryParams = (params: Record<string, string | null>) => {
    updateQueryParams({
      ...queryParams,
      ...params,
      'page[number]': null,
      'page[size]': null,
    })
  }

  const [search, setSearch] = useState(searchQuery)

  const debouncedSearchUpdate = useDebouncedCallback((value: string) => {
    onUpdateQueryParams({
      'filter[usernameLike]': value || null,
    })
  }, 300)

  const isError = isGetAbilityGroupListError
  const error = getAbilityGroupListError
  const isPending = isGetAbilityGroupListPending

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    debouncedSearchUpdate(event.target.value)
  }

  const sortChoices = [
    { label: 'Fullname:asc', value: 'fullName' },
    { label: 'Fullname:desc', value: '-fullName' },
  ]

  const onSortChange = (value: string) => {
    updateQueryParams({
      ...queryParams,
      sort: value || null,
    })
  }

  const onRoleChange = (value: string) => {
    onUpdateQueryParams({
      'filter[abilityGroups][id]': value || null,
    })
  }

  useEffect(() => {
    if (!(isError && error)) return
    toast.error(error.message)
  }, [isError, error])

  return {
    search,
    onSearchChange,
    sortQuery,
    sortChoices,
    onSortChange,
    roleQuery,
    onRoleChange,
    abilityGroupList: abilityGroupListData?.data ?? [],
    isPending,
    clearQueryParams,
  }
}
