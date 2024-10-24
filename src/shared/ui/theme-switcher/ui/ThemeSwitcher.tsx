import { Switch } from '~/shared/ui/switch'

import { useThemeSwitcher } from '../lib'

export function ThemeSwitcher() {
  const { isChecked, onThemeChange } = useThemeSwitcher()

  return <Switch checked={isChecked} onCheckedChange={onThemeChange} />
}
