import { Fragment, useMemo } from 'react'
import { Link } from 'react-router-dom'

import { BreadcrumbsProps } from '../model'

import { Breadcrumb } from './Breadcrumb'
import { BreadcrumbItem } from './BreadcrumbItem'
import { BreadcrumbList } from './BreadcrumbList'
import { BreadcrumbPage } from './BreadcrumbPage'
import { BreadcrumbSeparator } from './BreadcrumbSeparator'

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const isNotLastIndex = useMemo(
    () => (index: number) => {
      return index !== items.length - 1
    },
    [items]
  )

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map(({ label, link }, index) => (
          <Fragment key={label}>
            <BreadcrumbItem>
              {link ? (
                <Link to={link}>
                  <BreadcrumbPage className="text-primary">
                    {label}
                  </BreadcrumbPage>
                </Link>
              ) : (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {isNotLastIndex(index) && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
