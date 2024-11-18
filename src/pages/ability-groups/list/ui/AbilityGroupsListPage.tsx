import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { useGetAbilityGroupList } from '~/shared/api/ability-group'
import { Typography } from '~/shared/ui/typography'
import { AppBar } from '~/widgets/app-bar'

export function AbilityGroupsListPage() {
  const {
    data: abilityGroupList,
    isPending,
    isError,
    error,
  } = useGetAbilityGroupList()

  useEffect(() => {
    if (!isError) return
    toast.error(error?.message)
  }, [isError, error])

  return (
    <>
      <AppBar title="Ability-groups" />
      {isPending ? (
        <Loader />
      ) : (
        <div className="ability-group-list">
          {abilityGroupList ? (
            abilityGroupList.map((abilityGroup) => (
              <div key={abilityGroup.id}>
                <Typography>- {abilityGroup.description}</Typography>
              </div>
            ))
          ) : (
            <Typography tag="p">No data</Typography>
          )}
        </div>
      )}
    </>
  )
}
