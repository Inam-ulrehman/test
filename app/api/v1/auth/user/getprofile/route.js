import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'

import User from '@/models/User'
import { StatusCodes } from 'http-status-codes'
import { headers } from 'next/headers'

export async function GET(request, res) {
  await dbConnect()

  const headersList = headers()
  const _id = headersList.get('userId')

  try {
    const user = await User.find({ _id }, '-password')
    return new Response(
      JSON.stringify({
        success: true,
        msg: `success.`,
        result: user,
      }),
      {
        status: StatusCodes.ACCEPTED,
      }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
