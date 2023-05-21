import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

const UnauthenticatedError = (msg) => {
  return NextResponse.json({ msg: msg }, { status: StatusCodes.UNAUTHORIZED })
}

export default UnauthenticatedError
