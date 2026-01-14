import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, value, options } = body

    if (!name || value === undefined) {
      return NextResponse.json(
        { error: 'Missing name or value' },
        { status: 400 }
      )
    }

    const cookieStore = await cookies()

    cookieStore.set(name, value, {
      maxAge: options?.maxAge || undefined,
      path: options?.path || '/',
      sameSite: options?.sameSite || 'lax',
      httpOnly: options?.httpOnly ?? true,
      secure: options?.secure ?? (process.env.NODE_ENV === 'production'),
      ...options
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Cookie set error:', error)
    return NextResponse.json(
      { error: 'Failed to set cookie' },
      { status: 500 }
    )
  }
}