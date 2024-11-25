import { Cross2Icon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import get from 'lodash.get'
import * as React from 'react'

import { Typography } from '~/shared/ui/typography'

import { SelectForwardRef } from '../model'

import { SelectValue } from './RadixSelect'
import { SelectContent } from './SelectContent'
import { SelectItem } from './SelectItem'
import { SelectTrigger } from './SelectTrigger'

const Select = React.forwardRef<
  React.ElementRef<SelectForwardRef>,
  React.ComponentPropsWithoutRef<SelectForwardRef>
>(
  (
    {
      value,
      placeholder = 'Select a value',
      choices = [],
      choiceLabel = 'label',
      choiceValue = 'value',
      onChange,
      allowClear,
      ...props
    },
    ref
  ) => {
    const selectedChoice = React.useMemo(
      () => choices.find((choice) => get(choice, choiceValue) === value),
      [choices, value, choiceValue]
    )

    const onClear = (event: React.MouseEvent<SVGElement>) => {
      event.stopPropagation()
      onChange?.('')
    }

    return (
      <div ref={ref} className="w-full">
        <SelectPrimitive.Root value={value} onValueChange={onChange} {...props}>
          <SelectTrigger>
            <div className="flex w-full items-center justify-between">
              <SelectValue asChild placeholder={placeholder}>
                <Typography className="text-foreground">
                  {get(selectedChoice, choiceLabel)}
                </Typography>
              </SelectValue>
              {allowClear && value && (
                <Cross2Icon className="h-4 w-4" onPointerDown={onClear} />
              )}
            </div>
          </SelectTrigger>
          <SelectContent>
            {choices.length ? (
              choices.map((choice) => (
                <SelectItem
                  key={get(choice, choiceValue)}
                  value={get(choice, choiceValue)}
                >
                  {get(choice, choiceLabel)}
                </SelectItem>
              ))
            ) : (
              <Typography tag="p" className="text-center">
                No data
              </Typography>
            )}
          </SelectContent>
        </SelectPrimitive.Root>
      </div>
    )
  }
)

export { Select }
