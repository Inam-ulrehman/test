import { NextResponse } from 'next/server'
import * as jose from 'jose'

export const isLoggedIn = async (request) => {
  let token = request.cookies.get('Authorization_Token')?.value

  if (token === undefined || !token) {
    return
  }
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )

    if (payload.iss === 'user') {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_WEBSITE}/dashboard/user`
      )
    }
    if (payload.iss === 'admin') {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_WEBSITE}/dashboard/admin`
      )
    }
  } catch (error) {
    console.log(error)
  }
}
