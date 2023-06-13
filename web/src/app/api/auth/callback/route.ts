import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server' // utilizado para tipar o metodo GET

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const registerResponse = await api.post('/register', {
    code,
  })

  const { token } = registerResponse.data

  const redirectURL = new URL('/', request.url)

  const cookieExpiraPorSegundo = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiraPorSegundo}`,
    },
  })
}
