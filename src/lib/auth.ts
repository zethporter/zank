import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { adminClient } from 'better-auth/client/plugins'
import { admin, oneTap, organization, twoFactor } from 'better-auth/plugins'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { ac, manager } from './auth-permissions'
import { db } from '@/db/auth' // your drizzle instance
import * as schema from '@/db/schema/auth'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite', // or "mysql", "sqlite",
    schema: {
      ...schema,
    },
  }),
  appName: 'Wrestler of the Day',
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // accessType: "offline",
      // propt: "select_account consent"
    },
  },
  plugins: [
    twoFactor(),
    oneTap(),
    tanstackStartCookies(),
    organization(),
    admin({
      adminUserIds: [],
      plugins: [
        adminClient({
          ac,
          roles: {
            manager,
          },
        }),
      ],
    }),
  ],
})
