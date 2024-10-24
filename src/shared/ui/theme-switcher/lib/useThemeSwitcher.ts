import { useTheme } from '~/shared/lib/theme'

export function useThemeSwitcher() {
  const { setTheme, isDarkTheme } = useTheme()

  const isChecked = isDarkTheme

  const onThemeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light')
  }

  return {
    isChecked,
    onThemeChange,
  }
}
