import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import Sample from '@/public/models/Sample'

import { StatusCodes } from 'http-status-codes'

export async function POST(request, res) {
  const pathName = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams
  const cookies = request.cookies.getAll()
  const body = await request.json()
  await dbConnect()
  const { name, city, lastName } = body

  try {
    const result = await Sample.create({ name, city, lastName })
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
