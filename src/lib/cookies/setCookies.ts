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
    const res = await fetch('http://localhost:3000/api/cookies', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, value, options }),
    })

    if (!res.ok) {
        throw new Error('Failed to set cookie')
    }

    return true
}