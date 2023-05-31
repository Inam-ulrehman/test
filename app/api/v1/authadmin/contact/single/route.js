import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'

import Contact from '@/models/Contact'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function POST(request, res) {
  const body = await request.json()
  const { _id } = body

  await dbConnect()

  try {
    const result = await Contact.findById({ _id })
    if (!result) {
      return NextResponse.json(
        { success: false, msg: 'No results found' },
        { status: StatusCodes.NOT_FOUND }
      )
    }
    return NextResponse.json(
      { success: true, msg: 'Single result!', result },
      { status: StatusCodes.OK }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
