import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import { titleCase } from '@/lib/helper'
import User from '@/models/User'
import { StatusCodes } from 'http-status-codes'
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
export async function POST(request, res) {
  const body = await request.json()
  const { public_id } = body

  try {
    const result = await cloudinary.uploader.destroy(public_id)
    return new Response(
      JSON.stringify({ success: true, msg: 'Image deleted', result }),
      {
        status: StatusCodes.OK,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        msg: 'Something went wrong',
        result: error.result,
      }),
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      }
    )
  }
}
