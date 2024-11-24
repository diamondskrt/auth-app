import omit from 'lodash.omit'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import {
  AbilityGroup,
  useGetAbilityGroupList,
} from '~/shared/api/ability-group'
import { Resource } from '~/shared/api/config'
import { UUID } from '~/shared/api/model'
import {
  useCreateUser,
  useGetUserById,
  useUpdateUser,
  useAttachUserAbilityGroup,
  useDetachUserAbilityGroup,
} from '~/shared/api/user'
import { handleError } from '~/shared/lib/handleError'
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
    data: userData,
    isPending: isGetUserByIdPending,
    isError: isGetUserByIdError,
    error: getUserByIdError,
  } = useGetUserById({
    userId,
    queryParams: { include: `${Resource.AbilityGroups}` },
  })
  const {
    data: abilityGroupListData,
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

  const isPending = useMemo(
    () =>
      (isEditRoute && isGetUserByIdPending) ||
      isCreateUserPending ||
      isUpdateUserPending ||
      isGetAbilityGroupListPending ||
      isAttachUserAbilityGroupPending ||
      isDetachUserAbilityGroupPending,
    [
      isEditRoute,
      isGetUserByIdPending,
      isCreateUserPending,
      isUpdateUserPending,
      isGetAbilityGroupListPending,
      isAttachUserAbilityGroupPending,
      isDetachUserAbilityGroupPending,
    ]
  )

  const isError = useMemo(
    () =>
      isGetUserByIdError ||
      isCreateUserError ||
      isUpdateUserError ||
      isGetAbilityGroupListError ||
      isAttachUserAbilityGroupError ||
      isDetachUserAbilityGroupError,
    [
      isGetUserByIdError,
      isCreateUserError,
      isUpdateUserError,
      isGetAbilityGroupListError,
      isAttachUserAbilityGroupError,
      isDetachUserAbilityGroupError,
    ]
  )

  const error = useMemo(
    () =>
      getUserByIdError ||
      createUserError ||
      updateUserError ||
      getAbilityGroupListError ||
      attachUserAbilityGroupError ||
      detachUserAbilityGroupError,
    [
      getUserByIdError,
      createUserError,
      updateUserError,
      getAbilityGroupListError,
      attachUserAbilityGroupError,
      detachUserAbilityGroupError,
    ]
  )

  const user = userData?.data
  const abilityGroupList = abilityGroupListData?.data

  const upsertUserAbilityGroup = async (
    abilityGroups: AbilityGroup[],
    upsertUserId: UUID = userId as UUID
  ) => {
    const currentGroupIds = new Set(
      user?.abilityGroups?.map(({ id }) => id) ?? []
    )
    const newGroupIds = new Set(abilityGroups.map(({ id }) => id))

    const attachGroupIds = Array.from(newGroupIds).filter(
      (id) => !currentGroupIds.has(id)
    )
    const detachGroupIds = Array.from(currentGroupIds).filter(
      (id) => !newGroupIds.has(id)
    )

    await Promise.all([
      attachGroupIds.length &&
        attachUserAbilityGroup({
          userId: upsertUserId,
          abilityGroupIds: attachGroupIds as string[],
        }),
      detachGroupIds.length &&
        detachUserAbilityGroup({
          userId: upsertUserId,
          abilityGroupIds: detachGroupIds as string[],
        }),
    ])
  }

  const onSubmit = async (values: formSchema) => {
    try {
      if (isEditRoute) {
        await updateUser({ userId, data: omit(values, Resource.AbilityGroups) })
        await upsertUserAbilityGroup(values.abilityGroups)
        toast.success('User has been updated')
      } else {
        const newUser = (await createUser(omit(values, Resource.AbilityGroups)))
          ?.data
        if (!newUser?.id) throw new Error('User creation failed')
        await upsertUserAbilityGroup(values.abilityGroups, newUser.id)
        toast.success('User has been created')
      }
      navigate('/users')
    } catch (error) {
      handleError(error as Error)
    }
  }

  const form = useForm<formSchema>(formConfig)
  const { reset } = form

  useEffect(() => {
    if (user) reset(user)
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
