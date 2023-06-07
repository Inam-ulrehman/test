import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'

import { StatusCodes } from 'http-status-codes'
import Category from '@/models/product/Category'
export async function POST(request, res) {
  const body = await request.json()
  const { name } = body

  const _id = request.headers.get('userid')
  const check = await Category.findOne({ name })
  if (check) {
    return new Response(
      JSON.stringify({ success: false, msg: 'Category already exists' }),
      { status: StatusCodes.OK }
    )
  }
  await dbConnect()
  try {
    const result = await Category.create({ createdBy: _id, name })
    return new Response(
      JSON.stringify({ success: true, msg: 'Created', result }),
      { status: StatusCodes.CREATED }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
