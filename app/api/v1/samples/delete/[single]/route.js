import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/mongoose-error-handler'
import Sample from '@/public/models/Sample'

import { StatusCodes } from 'http-status-codes'

// =======delete==========
export async function DELETE(request, res) {
  await dbConnect()
  const pathName = request.nextUrl.pathname
  const _id = pathName.split('delete/')[1]

  try {
    const result = await Sample.findByIdAndDelete({ _id })
    if (!result) {
      return new Response(
        JSON.stringify({ success: false, msg: 'No Result found.', result }),
        {
          status: StatusCodes.NOT_FOUND,
        }
      )
    }
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
