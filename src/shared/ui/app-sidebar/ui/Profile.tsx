import { ChevronsUpDownIcon } from 'lucide-react'

import { useGetProfile } from '~/shared/api/profile'
import { getUserRole } from '~/shared/api/user/lib'
import { useAuth } from '~/shared/lib/auth'
import { Avatar, AvatarImage, AvatarFallback } from '~/shared/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '~/shared/ui/dropdown-menu'

import { profileMenuItems } from '../config'

export function Profile() {
  const { clearTokens } = useAuth()

  const { data: user } = useGetProfile()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-between rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 rounded-md">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div>{user?.email}</div>
              <div>{getUserRole(user)}</div>
            </div>
          </div>
          <ChevronsUpDownIcon className="h-4 w-4 shrink-0" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profileMenuItems.map(({ title }) => (
          <DropdownMenuItem key={title} disabled>
            {title}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={clearTokens}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
