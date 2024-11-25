import * as React from 'react'

import { CheckboxForwardRef } from '../model'

import { RadixCheckbox } from './RadixCheckbox'

const Checkbox = React.forwardRef<
  React.ElementRef<CheckboxForwardRef>,
  React.ComponentPropsWithoutRef<CheckboxForwardRef>
>(
  (
    { checkBoxId, value, onChange, label, description, ...checkboxProps },
    ref
  ) => {
    return (
      <div className="items-top flex space-x-2">
        <RadixCheckbox
          ref={ref}
          checked={value as boolean}
          id={checkBoxId}
          onCheckedChange={onChange}
          {...checkboxProps}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={checkBoxId}
            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox }
