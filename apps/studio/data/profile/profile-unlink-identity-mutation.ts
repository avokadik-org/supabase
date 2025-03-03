import type { UserIdentity } from '@supabase/supabase-js'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'sonner'

import { auth } from 'lib/gotrue'

const unlinkIdentity = async (identity: UserIdentity) => {
  const { error, data } = await auth.unlinkIdentity(identity)

  if (error) throw error
  return data
}

type UnlinkIdentityResponse = any
type UnlinkIdentityError = any

export const useUnlinkIdentityMutation = ({
  onSuccess,
  onError,
  ...options
}: Omit<
  UseMutationOptions<UnlinkIdentityResponse, UnlinkIdentityError, UserIdentity>,
  'mutationFn'
> = {}) => {
  return useMutation((vars) => unlinkIdentity(vars), {
    async onSuccess(data, variables, context) {
      await auth.getUserIdentities()
      await onSuccess?.(data, variables, context)
    },
    async onError(data, variables, context) {
      if (onError === undefined) {
        toast.error(`Failed to unlink identity: ${data.message}`)
      } else {
        onError(data, variables, context)
      }
    },
    ...options,
  })
}
