import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

const BadRequestError = (msg) => {
  return NextResponse.json({ msg: msg }, { status: StatusCodes.BAD_REQUEST })
}

export default BadRequestError
