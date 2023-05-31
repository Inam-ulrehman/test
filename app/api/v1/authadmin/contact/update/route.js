import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import Contact from '@/models/Contact'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function PATCH(request, res) {
  const body = await request.json()

  const { name, email, mobile, subject, message, _id } = body
  await dbConnect()
  try {
    const result = await Contact.findByIdAndUpdate(
      { _id },
      { name, email, mobile, subject, message },
      { new: true }
    )
    if (!result) {
      return NextResponse.json(
        { status: false, msg: 'No result found', result },
        { status: StatusCodes.OK }
      )
    }
    return NextResponse.json(
      { status: false, msg: 'Successfully updated', result },
      { status: StatusCodes.OK }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
