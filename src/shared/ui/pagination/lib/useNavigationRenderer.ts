import range from 'lodash.range'
import { useMemo } from 'react'

import { PAGES_NUM_TO_SHOW, TAIL_SIZE } from '../config'
import { PagesPart } from '../model'

const safeStart = (start: number): number => Math.max(start, 1)

export function useNavigationRenderer(page: number, totalPages: number) {
  const part: PagesPart = useMemo(() => {
    if (page <= TAIL_SIZE) return 'start'
    if (page >= totalPages - TAIL_SIZE) return 'end'
    return 'middle'
  }, [page, totalPages])

  const maxPageNumbersToShow = Math.min(totalPages, PAGES_NUM_TO_SHOW)

  const pagesToRender = useMemo(() => {
    switch (part) {
      case 'start':
        return range(1, maxPageNumbersToShow + 1)
      case 'end':
        return range(
          safeStart(totalPages - maxPageNumbersToShow + 1),
          totalPages + 1
        )
      default:
        return range(safeStart(page - TAIL_SIZE), page + TAIL_SIZE + 1)
    }
  }, [page, totalPages, part, maxPageNumbersToShow])

  const shouldLeftEllipsesRender = !pagesToRender.includes(1)
  const shouldRightEllipsesRender = !pagesToRender.includes(totalPages)

  return { pagesToRender, shouldLeftEllipsesRender, shouldRightEllipsesRender }
}
