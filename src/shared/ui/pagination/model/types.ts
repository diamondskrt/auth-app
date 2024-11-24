import { ButtonProps } from '~/shared/ui/button'

type PaginationProps = {
  total?: number
  initialPage?: number
  perPage?: number
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>

type PagesPart = 'start' | 'middle' | 'end'

export type { PaginationLinkProps, PagesPart, PaginationProps }
