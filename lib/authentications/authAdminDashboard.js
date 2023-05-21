import { NextResponse } from 'next/server'
import * as jose from 'jose'

export const authAdminDashboard = async (request) => {
  let token = request.cookies.get('token')?.value
  if (token === undefined || !token) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_WEBSITE}/user/login`
    )
  }
  try {
    await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
      {
        issuer: 'admin',
        audience: 'urn:example:audience',
      }
    )
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_WEBSITE}/user/login`
    )
  }
}
