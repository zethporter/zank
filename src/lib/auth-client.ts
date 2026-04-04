import { createAuthClient } from 'better-auth/react'
import { adminClient, organizationClient } from 'better-auth/client/plugins'

export const { useSession, signIn, signOut, signUp, getSession, admin } =
  createAuthClient({
    redirectTo: '/manage',
    plugins: [adminClient(), organizationClient()],
  })
