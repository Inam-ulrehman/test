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
  const { _ids } = body

  await dbConnect()

  try {
    // Find categories to be deleted
    const categories = await SubCategory.find({ _id: { $in: _ids } })

    if (categories.length === 0) {
      return NextResponse.json(
        { success: false, msg: 'No results found' },
        { status: StatusCodes.NOT_FOUND }
      )
    }

    const publicIds = []

    // Collect public_ids of images to be deleted
    categories.forEach((category) => {
      category.images.forEach((image) => {
        publicIds.push(image.response.public_id)
      })
    })

    // Delete images from cloudinary
    if (publicIds.length > 0) {
      const cloudDestroy = await cloudinary.api.delete_resources(publicIds)

      const hasNotFound = Object.values(cloudDestroy.deleted).includes(
        'not_found'
      )

      if (hasNotFound) {
        return NextResponse.json(
          {
            success: false,
            msg: 'Cloudinary images not found',
          },
          { status: StatusCodes.OK }
        )
      }
    }

    // Delete categories from the database
    const result = await SubCategory.deleteMany({ _id: { $in: _ids } })

    return NextResponse.json(
      { success: true, msg: `${result.deletedCount} results deleted`, result },
      { status: StatusCodes.OK }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
