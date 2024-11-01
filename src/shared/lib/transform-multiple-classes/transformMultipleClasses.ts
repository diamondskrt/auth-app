const processSelector = (input: string) => {
  const regex = /^(.*?):(.*)$/
  const match = input.match(regex)

  if (!match) return input

  const baseSelector = match[1] + ':'
  const values = match[2].split(',')

  return values.map((value) => `${baseSelector}${value}`).join(' ')
}

const transformMultipleClasses = (classes: string) => {
  const result = classes
    .split(' ')
    .map((className) => {
      if (className.includes(',')) return processSelector(className)
      return className
    })
    .join(' ')

  return result
}

export { transformMultipleClasses }
