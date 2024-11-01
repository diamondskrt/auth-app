import { ChevronDownIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import get from 'lodash.get'
import * as React from 'react'

import { cn } from '~/shared/lib/utils'
import {
  Command,
  CommandList,
  CommandItem,
  CommandEmpty,
} from '~/shared/ui/command'
import { inputClassName } from '~/shared/ui/input'
import { Popover, PopoverTrigger, PopoverContent } from '~/shared/ui/popover'
import { selectTriggerClassName } from '~/shared/ui/select/config'
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
      onChange,
      className,
      ...props
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
      <Popover>
        <PopoverTrigger
          disabled={disabled || loading}
          className={cn(selectTriggerClassName)}
          asChild
        >
          <div
            ref={ref}
            {...props}
            className={cn(
              inputClassName,
              className,
              (disabled || loading) && 'pointer-events-none'
            )}
          >
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
            <div className="flex items-center gap-1">
              {allowClear && Boolean(slicedValue.length) && (
                <Cross2Icon className="h-4 w-4" onClick={onClear} />
              )}
              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-1 shadow-none">
          <Command>
            <CommandList>
              <CommandEmpty>
                <Typography tag="p" className="text-center">
                  No data
                </Typography>
              </CommandEmpty>
              {choices.map((choice) => (
                <CommandItem
                  value={get(choice, choiceValue)}
                  key={get(choice, choiceValue)}
                  className="justify-between"
                  onSelect={onValueChange}
                >
                  <Typography>{get(choice, choiceLabel)}</Typography>
                  {isSelectedChoice(get(choice, choiceValue)) && (
                    <CheckIcon className="h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }
)

export { SelectMultiple }
