import get from 'lodash.get'
import { useCallback, useMemo } from 'react'

import { SelectMultipleProps } from '../model'

export function useSelectMultipleActions({
  value = [],
  choices = [],
  choiceValue = 'value',
  maxCount,
  onChange,
  returnObject,
}: SelectMultipleProps) {
  const localValue = returnObject
    ? value.map((choice) => get(choice, choiceValue))
    : structuredClone(value)

  const foundChoice = useCallback(
    (selectedChoiceValue: string) =>
      choices.find(
        (choice) => get(choice, choiceValue) === selectedChoiceValue
      ),
    [choices, choiceValue]
  )

  const isSelectedChoice = useCallback(
    (selectedChoiceValue: string) =>
      localValue.some((choiceValue) => choiceValue === selectedChoiceValue),
    [localValue]
  )

  const slicedValue = useMemo<string[]>(
    () => localValue.slice(0, maxCount),
    [localValue, maxCount]
  )

  const isCommaRequired = (index: number) => {
    return slicedValue.length > 1 && index !== slicedValue.length - 1
  }

  const count = useMemo(() => {
    return localValue.length - slicedValue.length
  }, [localValue, slicedValue])

  const convertSelectedChoices = (selectedChoices: string[]) => {
    return returnObject
      ? choices.filter((choice) =>
          selectedChoices.includes(get(choice, choiceValue))
        )
      : selectedChoices
  }

  const onValueChange = (selectedChoiceValue: string) => {
    const selectedChoices = isSelectedChoice(selectedChoiceValue)
      ? localValue.filter((choice) => choice !== selectedChoiceValue)
      : [...localValue, selectedChoiceValue]

    onChange?.(convertSelectedChoices(selectedChoices))
  }

  const onClear = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation()
    onChange?.([])
  }

  return {
    slicedValue,
    count,
    isCommaRequired,
    foundChoice,
    isSelectedChoice,
    onValueChange,
    onClear,
  }
}
