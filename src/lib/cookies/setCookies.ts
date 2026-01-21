"use server"

import { cookies } from "next/headers"

export async function setCookie(
  name: string,
  value: string,
  options?: {
    maxAge?: number
    path?: string
    sameSite?: 'strict' | 'lax' | 'none'
    httpOnly?: boolean
    secure?: boolean
  }
) {
  const cookieStore = await cookies()

  cookieStore.set(name, value, {
    maxAge: options?.maxAge || undefined,
    path: options?.path || '/',
    sameSite: options?.sameSite || 'lax',
    httpOnly: options?.httpOnly ?? true,
    secure: options?.secure ?? (process.env.NODE_ENV === 'production'),
    ...options
  })
}