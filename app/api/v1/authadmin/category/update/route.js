import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'

import { StatusCodes } from 'http-status-codes'
import Category from '@/models/product/Category'
export async function PATCH(request, res) {
  const body = await request.json()
  const { name, images, _id } = body

  const check = await Category.find({ name })

  // console.log(check.find((item) => item._id !== _id))

  if (check) {
    return new Response(
      JSON.stringify({ success: false, msg: 'Category already exists' }),
      { status: StatusCodes.OK }
    )
  }
  await dbConnect()
  try {
    const result = await Category.findByIdAndUpdate(
      { _id },
      { name, images },
      { new: true }
    )
    return new Response(
      JSON.stringify({ success: true, msg: 'Created', result }),
      { status: StatusCodes.CREATED }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
