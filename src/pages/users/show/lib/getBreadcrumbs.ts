import { User } from '~/shared/api/user'
import { BreadcrumbsItem } from '~/shared/ui/breadcrumbs'

const getBreadcrumbs = (user?: User): BreadcrumbsItem[] => [
  { link: '/users', label: 'Users' },
  { label: user?.fullName ?? '' },
]

export { getBreadcrumbs }
