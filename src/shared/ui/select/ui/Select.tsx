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
      ...props
    },
    ref
  ) => {
    const selectedChoice = React.useMemo(
      () => choices.find((choice) => get(choice, choiceValue) === value),
      [choices, value, choiceValue]
    )

    return (
      <div ref={ref}>
        <SelectPrimitive.Root {...props} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} asChild>
              <Typography className="text-foreground">
                {get(selectedChoice, choiceLabel)}
              </Typography>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {choices.length ? (
              choices.map((choice) => (
                <SelectItem
                  value={get(choice, choiceValue)}
                  key={get(choice, choiceValue)}
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
