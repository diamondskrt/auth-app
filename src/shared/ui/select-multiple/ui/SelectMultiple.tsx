import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import get from 'lodash.get'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'
import {
  Command,
  CommandList,
  CommandItem,
  commandItemClassName,
} from '~/shared/ui/command'
import { SelectContent, SelectTrigger } from '~/shared/ui/select'
import { Typography } from '~/shared/ui/typography'

import { useSelectMultipleActions } from '../lib'
import { SelectMultipleForwardRef } from '../model'

const SelectMultiple = React.forwardRef<
  React.ElementRef<SelectMultipleForwardRef>,
  React.ComponentPropsWithoutRef<SelectMultipleForwardRef>
>(
  (
    {
      value = [],
      placeholder = 'Select a value',
      choices = [],
      choiceLabel = 'label',
      choiceValue = 'value',
      allowClear,
      disabled,
      loading,
      returnObject,
      maxCount = value.length,
      className,
      onChange,
    },
    ref
  ) => {
    const {
      slicedValue,
      count,
      isCommaRequired,
      foundChoice,
      isSelectedChoice,
      onValueChange,
      onClear,
    } = useSelectMultipleActions({
      value,
      choices,
      choiceValue,
      maxCount,
      returnObject,
      onChange,
    })

    return (
      <div ref={ref} className={cn('select-multiple w-full', className)}>
        <SelectPrimitive.Root disabled={disabled || loading}>
          <SelectTrigger>
            <div className="flex w-full items-center justify-between">
              <div className="flex gap-1">
                {slicedValue.length ? (
                  <div className="flex gap-1">
                    {slicedValue.map((choiceValue, index) => (
                      <div key={choiceValue} className="text-foreground">
                        {get(foundChoice(choiceValue), choiceLabel)}
                        {isCommaRequired(index) && ','}
                      </div>
                    ))}
                    {Boolean(count) && <Typography>+{count}</Typography>}
                  </div>
                ) : (
                  <Typography className="text-sm text-muted-foreground">
                    {placeholder}
                  </Typography>
                )}
              </div>
              {allowClear && Boolean(slicedValue.length) && (
                <Cross2Icon className="h-4 w-4" onPointerDown={onClear} />
              )}
            </div>
          </SelectTrigger>
          <SelectContent>
            <Command>
              <CommandList>
                {choices.length ? (
                  choices.map((choice) => (
                    <CommandItem key={get(choice, choiceValue)} asChild>
                      <div
                        key={get(choice, choiceValue)}
                        className={cn(commandItemClassName)}
                        role="option"
                        onClick={() => onValueChange(get(choice, choiceValue))}
                      >
                        <span>{get(choice, choiceLabel)}</span>
                        {isSelectedChoice(get(choice, choiceValue)) && (
                          <CheckIcon className="h-4 w-4" />
                        )}
                      </div>
                    </CommandItem>
                  ))
                ) : (
                  <Typography tag="p" className="text-center">
                    No data
                  </Typography>
                )}
              </CommandList>
            </Command>
          </SelectContent>
        </SelectPrimitive.Root>
      </div>
    )
  }
)

export { SelectMultiple }
