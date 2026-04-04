import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { auth } from '../lib/auth'

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })

    console.log('hit Middleware', { session: !!session })
    if (!session) {
      throw redirect({ to: '/login' })
    }

    return await next()
  },
)

export const adminMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const headers = getRequestHeaders()
    const session = await auth.api.getSession({ headers })

    if (!session) {
      throw redirect({ to: '/login' })
    }

    // Fetch the full user data to check role
    const user = session.user

    if (user.role && user.role.includes('admin')) {
      return await next()
    }

    // Redirect non-admins to the home page or show a 403
    throw redirect({ to: '/' })
  },
)
