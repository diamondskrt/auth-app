import { ChevronsUpDownIcon } from 'lucide-react'

import { getUserRole } from '~/shared/api/ability-group'
import { Avatar, AvatarImage, AvatarFallback } from '~/shared/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '~/shared/ui/dropdown-menu'
import { Skeleton } from '~/shared/ui/skeleton'
import { Typography } from '~/shared/ui/typography'

import { profileMenuItems } from '../config'
import { useProfileActions } from '../lib'

export function Profile() {
  const { user, clearTokens } = useProfileActions()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-between rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/img/dog.png" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            {user ? (
              <div className="flex flex-col">
                <Typography>{user?.email}</Typography>
                <Typography>{getUserRole(user?.abilityGroups)}</Typography>
              </div>
            ) : (
              <div className="flex flex-col">
                <Skeleton className="h-[20px] w-[130px]" />
                <Skeleton className="h-[20px] w-[60px]" />
              </div>
            )}
          </div>
          <ChevronsUpDownIcon className="h-4 w-4 shrink-0" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileMenuItems.map(({ label }) => (
          <DropdownMenuItem key={label} disabled>
            {label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={clearTokens}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
