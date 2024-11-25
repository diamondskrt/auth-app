import { useMemo } from 'react'

import { cn } from '~/shared/lib/utils'

import { useNavigationRenderer, usePaginationActions } from '../lib'
import { PaginationProps } from '../model'

import { PaginationContent } from './PaginationContent'
import { PaginationEllipsis } from './PaginationEllipsis'
import { PaginationItem } from './PaginationItem'
import { PaginationLink } from './PaginationLink'
import { PaginationNav } from './PaginationNav'
import { PaginationNext } from './PaginationNext'
import { PaginationPrevious } from './PaginationPrevious'

export function Pagination(props: PaginationProps) {
  const { page, hasNextPage, hasPreviousPage, total, setPage, perPage } =
    usePaginationActions({
      total: props.total,
      initialPage: props.initialPage,
      perPage: props.perPage,
    })

  const totalPages = useMemo(() => Math.ceil(total / perPage), [total, perPage])

  const { shouldRightEllipsesRender, shouldLeftEllipsesRender, pagesToRender } =
    useNavigationRenderer(page, totalPages)

  const isActivePage = (renderPage: number) => {
    return renderPage === page
  }

  if (totalPages < 2) return null

  return (
    <PaginationNav>
      <PaginationContent>
        <PaginationItem
          disabled={!hasPreviousPage}
          className="cursor-pointer"
          onClick={() => setPage(page - 1)}
        >
          <PaginationPrevious />
        </PaginationItem>
        {shouldLeftEllipsesRender && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pagesToRender.map((renderPage) => (
          <PaginationItem
            key={renderPage}
            className={cn(
              'cursor-pointer',
              isActivePage(renderPage) && 'pointer-events-none'
            )}
            onClick={() => setPage(renderPage)}
          >
            <PaginationLink isActive={isActivePage(renderPage)}>
              {renderPage}
            </PaginationLink>
          </PaginationItem>
        ))}
        {shouldRightEllipsesRender && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem
          disabled={!hasNextPage}
          className="cursor-pointer"
          onClick={() => setPage(page + 1)}
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationNav>
  )
}
