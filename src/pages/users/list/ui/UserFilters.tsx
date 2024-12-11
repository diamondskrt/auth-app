import { cn } from '~/shared/lib/utils'
import { Button } from '~/shared/ui/button'
import { Input } from '~/shared/ui/input'
import { Select } from '~/shared/ui/select'

import { useUserFilterActions } from '../lib'
import { UserFiltersProps } from '../model'

export function UserFilters({ className }: UserFiltersProps) {
  const {
    search,
    onSearchChange,
    roleQuery,
    onRoleChange,
    sortQuery,
    sortChoices,
    onSortChange,
    abilityGroupList,
    isPending,
    clearQueryParams,
  } = useUserFilterActions()

  return (
    <div className={cn('flex gap-4', className)}>
      <Input
        allowClear
        value={search}
        disabled={isPending}
        placeholder="Username"
        onChange={onSearchChange}
      />
      <Select
        allowClear
        value={roleQuery}
        choices={abilityGroupList}
        choiceLabel="description"
        choiceValue="id"
        disabled={isPending}
        placeholder="Role"
        onChange={onRoleChange}
      />
      <Select
        allowClear
        value={sortQuery}
        choices={sortChoices}
        placeholder="Sort"
        onChange={onSortChange}
      />
      <Button variant="outline" onClick={clearQueryParams}>
        Clear filters
      </Button>
    </div>
  )
}
