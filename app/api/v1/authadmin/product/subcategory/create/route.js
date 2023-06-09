import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'

import { StatusCodes } from 'http-status-codes'
import SubCategory from '@/models/product/SubCategory'

export async function POST(request, res) {
  const body = await request.json()
  const { name, categories } = body

  const _id = request.headers.get('userid')

  await dbConnect()

  try {
    const categoryCount = await SubCategory.countDocuments({ name })

    if (categoryCount > 0) {
      return new Response(
        JSON.stringify({ success: false, msg: 'SubCategory already exists' }),
        { status: StatusCodes.CONFLICT }
      )
    }

    const result = await SubCategory.create({
      createdBy: _id,
      name,
      categories,
    })

    return new Response(
      JSON.stringify({ success: true, msg: 'Created', result }),
      { status: StatusCodes.CREATED }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
