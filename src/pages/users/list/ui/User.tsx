import { SquareArrowOutUpRight, Ellipsis } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { UserInfo } from '~/entities/user'
import { Button } from '~/shared/ui/button'
import { Confirm } from '~/shared/ui/confirm'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/shared/ui/dropdown-menu'

import { UserProps } from '../model'

export function User({ data: user, onBlockUserToggle, deleteUser }: UserProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  return (
    <div key={user.id} className="flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <Link to={`/users/${user.id}`}>
          <SquareArrowOutUpRight className="h-4 w-4 shrink-0" />
        </Link>
        <UserInfo user={user} />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Ellipsis className="h-4 w-4 shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link to={`/users/${user.id}`}>
            <DropdownMenuItem>View</DropdownMenuItem>
          </Link>
          <Link to={`/users/${user.id}/edit`}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </Link>
          {user.blockedAt ? (
            <DropdownMenuItem
              onClick={() =>
                onBlockUserToggle({ userId: user.id, block: false })
              }
            >
              Unblock
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() =>
                onBlockUserToggle({ userId: user.id, block: true })
              }
            >
              Block
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setIsConfirmOpen(true)}>
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Confirm
        open={isConfirmOpen}
        setIsOpen={setIsConfirmOpen}
        onOk={() => deleteUser(user.id)}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  )
}
