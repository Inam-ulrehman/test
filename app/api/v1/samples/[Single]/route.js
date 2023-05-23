import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/mongoose-error-handler'
import Sample from '@/public/models/Sample'

import { StatusCodes } from 'http-status-codes'

// =======single==========
export async function GET(request, res) {
  await dbConnect()
  const pathName = request.nextUrl.pathname
  const _id = pathName.split('samples/')[1]

  try {
    const result = await Sample.findById({ _id })

    return new Response(
      JSON.stringify({ success: true, msg: 'success.', result }),
      {
        status: StatusCodes.OK,
      }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
