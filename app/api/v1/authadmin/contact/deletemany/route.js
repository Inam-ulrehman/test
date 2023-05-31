import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'

import Contact from '@/models/Contact'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

export async function POST(request, res) {
  const body = await request.json()

  await dbConnect()

  try {
    const result = await Contact.deleteMany(body)
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, msg: '0 result deleted', result },
        { status: StatusCodes.OK }
      )
    }
    return NextResponse.json(
      { success: true, msg: `${result.deletedCount} results deleted`, result },
      { status: StatusCodes.OK }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
