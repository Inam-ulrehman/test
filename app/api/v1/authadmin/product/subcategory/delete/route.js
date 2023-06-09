import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'

import SubCategory from '@/models/product/SubCategory'
import { StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
export async function POST(request, res) {
  const body = await request.json()
  const { _id } = body

  await dbConnect()

  try {
    const product = await SubCategory.findById({ _id })

    if (!product) {
      return NextResponse.json(
        { success: false, msg: 'No results found' },
        { status: StatusCodes.NOT_FOUND }
      )
    }

    const publicIds = product.images.map((image) => image.response.public_id)

    // delete image from cloudinary
    if (publicIds.length > 0) {
      const cloudDestroy = await cloudinary.api.delete_resources(publicIds)

      const hasNotFound = Object.values(cloudDestroy.deleted).includes(
        'not_found'
      )
      // cloudinary returns not_found if image is not found
      const result = await SubCategory.deleteOne({ _id })
      if (hasNotFound) {
        return NextResponse.json(
          {
            success: false,
            msg: 'Cloudinary Not found deleted from database',
            result,
          },
          { status: StatusCodes.OK }
        )
      }
    }

    // delete product from database
    const result = await SubCategory.deleteOne({ _id })
    return NextResponse.json(
      { success: true, msg: 'Successfully Deleted!', result },
      { status: StatusCodes.OK }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
