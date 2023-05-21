import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
import { BadRequestError } from '../errors'
import * as jose from 'jose'

export const authApi = async (req) => {
  const authHeader = req.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return BadRequestError('Auth is Missing.')
  }
  const jwt = authHeader.split(' ')[1]
  try {
    const { payload, protectedHeader } = await jose.jwtVerify(
      jwt,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )

    // const { userId, name } = payload
    // const user = { userId, name }
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('userid', payload.userId)
    requestHeaders.set('name', payload.name)

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
    return response
  } catch (error) {
    // console.log(error)
    return NextResponse.json(
      { msg: 'Authentication Invalid' },
      { status: StatusCodes.UNAUTHORIZED }
    )
  }

  // return  new BadRequestError('No data found')
}
