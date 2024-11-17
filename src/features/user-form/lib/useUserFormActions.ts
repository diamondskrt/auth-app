import omit from 'lodash.omit'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import {
  AbilityGroup,
  useGetAbilityGroupList,
} from '~/shared/api/ability-group'
import { Resource } from '~/shared/api/config'
import {
  useCreateUser,
  useGetUserById,
  useUpdateUser,
  useAttachUserAbilityGroup,
  useDetachUserAbilityGroup,
} from '~/shared/api/user'
import { useLocationPath } from '~/shared/lib/location'

import { formConfig } from '../config'
import { formSchema } from '../model'

export function useUserFormActions() {
  const { isEditRoute } = useLocationPath()
  const { id: userId } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const {
    mutateAsync: createUser,
    isPending: isCreateUserPending,
    isError: isCreateUserError,
    error: createUserError,
  } = useCreateUser()
  const {
    mutateAsync: updateUser,
    isPending: isUpdateUserPending,
    isError: isUpdateUserError,
    error: updateUserError,
  } = useUpdateUser()
  const {
    data: user,
    isPending: isGetUserByIdPending,
    isError: isGetUserByIdError,
    error: getUserByIdError,
  } = useGetUserById({
    userId,
    queryParams: { include: `${Resource.AbilityGroups}` },
  })
  const {
    data: abilityGroupList,
    isPending: isGetAbilityGroupListPending,
    isError: isGetAbilityGroupListError,
    error: getAbilityGroupListError,
  } = useGetAbilityGroupList()
  const {
    mutateAsync: attachUserAbilityGroup,
    isPending: isAttachUserAbilityGroupPending,
    isError: isAttachUserAbilityGroupError,
    error: attachUserAbilityGroupError,
  } = useAttachUserAbilityGroup()
  const {
    mutateAsync: detachUserAbilityGroup,
    isPending: isDetachUserAbilityGroupPending,
    isError: isDetachUserAbilityGroupError,
    error: detachUserAbilityGroupError,
  } = useDetachUserAbilityGroup()

  const isPending =
    (isEditRoute && isGetUserByIdPending) ||
    isCreateUserPending ||
    isUpdateUserPending ||
    isGetAbilityGroupListPending ||
    isAttachUserAbilityGroupPending ||
    isDetachUserAbilityGroupPending

  const isError =
    isGetUserByIdError ||
    isCreateUserError ||
    isUpdateUserError ||
    isGetAbilityGroupListError ||
    isAttachUserAbilityGroupError ||
    isDetachUserAbilityGroupError

  const error =
    getUserByIdError ||
    createUserError ||
    updateUserError ||
    getAbilityGroupListError ||
    attachUserAbilityGroupError ||
    detachUserAbilityGroupError

  const upsertUserAbilityGroup = (abilityGroups: AbilityGroup[]) => {
    const attachGroupIds = new Set(
      user?.abilityGroups?.map(({ id }) => id as string) ?? []
    )
    const detachGroupIds = new Set(abilityGroups.map(({ id }) => id as string))

    const attachAbilityGroupData = [...detachGroupIds].filter(
      (id) => !attachGroupIds.has(id)
    )
    const detachAbilityGroupData = [...attachGroupIds].filter(
      (id) => !detachGroupIds.has(id)
    )

    if (attachAbilityGroupData.length) {
      attachUserAbilityGroup({
        userId,
        abilityGroupIds: attachAbilityGroupData,
      })
    }

    if (detachAbilityGroupData.length) {
      detachUserAbilityGroup({
        userId,
        abilityGroupIds: detachAbilityGroupData,
      })
    }
  }

  const onSubmit = async (values: formSchema) => {
    if (isEditRoute) {
      await updateUser({
        userId,
        data: omit(values, Resource.AbilityGroups),
      })
      await upsertUserAbilityGroup(values.abilityGroups)
      toast.success('User has been updated')
    } else {
      await createUser(omit(values, Resource.AbilityGroups))
      toast.success('User has been created')
    }
    navigate('/users')
  }

  const form = useForm<formSchema>(formConfig)

  const { reset } = form

  useEffect(() => {
    if (user) {
      reset(user)
    }
  }, [user, reset])

  useEffect(() => {
    if (!(isError && error)) return
    toast.error(error.message)
  }, [isError, error])

  return {
    abilityGroupList,
    form,
    onSubmit,
    isPending,
  }
}
