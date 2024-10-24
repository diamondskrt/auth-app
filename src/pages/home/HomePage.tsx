import { Button } from '~/shared/ui/button'
import { ThemeSwitcher } from '~/shared/ui/theme-switcher'

export function HomePage() {
  return (
    <>
      <h1>HomePage</h1>
      <div className="mt-2 flex gap-2">
        <Button>Button</Button>
        <ThemeSwitcher />
      </div>
    </>
  )
}
