import { Users, Group } from 'lucide-react'

const menuItems = [
  {
    label: 'Users',
    link: '/users',
    Icon: Users,
  },
  {
    label: 'Ability groups',
    link: '/ability-groups',
    Icon: Group,
  },
]

const profileMenuItems = [
  {
    label: 'Profile',
    link: '#',
  },
  {
    label: 'Settings',
    link: '#',
  },
]

export { menuItems, profileMenuItems }
