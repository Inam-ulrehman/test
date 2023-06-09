import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import { StatusCodes } from 'http-status-codes'
import SubCategory from '@/models/product/SubCategory'

export async function PATCH(request, res) {
  const body = await request.json()
  const { name, images, _id } = body

  await dbConnect()

  try {
    // Check if any other category already has the desired name
    const existingSubCategory = await SubCategory.findOne({
      name: name,
      _id: { $ne: _id },
    })

    if (existingSubCategory) {
      // Handle the case where another category already has the same name
      return new Response(
        JSON.stringify({
          success: false,
          msg: 'Another category with the same name already exists',
        }),
        { status: StatusCodes.CONFLICT }
      )
    }

    // Update the category
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      { _id },
      { name, images },
      { new: true }
    )

    return new Response(
      JSON.stringify({
        success: true,
        msg: 'SubCategory updated',
        result: updatedSubCategory,
      }),
      { status: StatusCodes.OK }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
