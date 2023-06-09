import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'

import { StatusCodes } from 'http-status-codes'
import Category from '@/models/product/Category'
export async function POST(request, res) {
  const body = await request.json()
  const { _id } = body

  await dbConnect()
  try {
    const result = await Category.findById({ _id })
    if (!result) {
      return new Response(
        JSON.stringify({ success: false, msg: 'Not Found' }),
        { status: StatusCodes.NOT_FOUND }
      )
    }
    return new Response(
      JSON.stringify({ success: true, msg: 'Created', result }),
      { status: StatusCodes.CREATED }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
