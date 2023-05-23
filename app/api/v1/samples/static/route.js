import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import Sample from '@/public/models/Sample'
import { StatusCodes } from 'http-status-codes'
export async function GET(request, res) {
  await dbConnect()

  try {
    const result = await Sample.find()
    return new Response(
      JSON.stringify({
        success: true,
        msg: 'success.',
        nbHits: result.length,
        result,
      }),
      {
        status: StatusCodes.OK,
      }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
  // const result = ''
}
