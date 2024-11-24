import { cn } from '~/shared/lib/utils'
import { Input } from '~/shared/ui/input'
import { Select } from '~/shared/ui/select'

import { useUserFilterActions } from '../lib'
import { UserFiltersProps } from '../model'

export function UserFilters({ className }: UserFiltersProps) {
  const {
    search,
    onSearchChange,
    role,
    abilityGroupList,
    isPending,
    onRoleChange,
  } = useUserFilterActions()

  return (
    <div className={cn('flex gap-4', className)}>
      <Input
        value={search}
        onChange={onSearchChange}
        disabled={isPending}
        placeholder="Search"
      />
      <Select
        value={role}
        choices={abilityGroupList}
        choiceLabel="description"
        choiceValue="id"
        disabled={isPending}
        placeholder="Role"
        allowClear
        onChange={onRoleChange}
      />
    </div>
  )
}
