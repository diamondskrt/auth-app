import { LoaderIcon } from 'lucide-react'

import { Typography } from '~/shared/ui/typography'

export function Loader() {
  return (
    <div className="flex items-center gap-2">
      <LoaderIcon className="h-4 w-4 animate-spin" />
      <Typography>Loading</Typography>
    </div>
  )
}
