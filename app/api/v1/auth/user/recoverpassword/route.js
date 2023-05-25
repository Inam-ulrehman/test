import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import bcrypt from 'bcryptjs'
import User from '@/models/User'
import { StatusCodes } from 'http-status-codes'
import { headers } from 'next/headers'

export async function POST(request, res) {
  await dbConnect()
  const body = await request.json()
  const headersList = headers()
  const _id = headersList.get('userId')
  const { password } = body
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  try {
    const user = await User.findOneAndUpdate(
      { _id },
      { password: hashedPassword }
    )
    return new Response(
      JSON.stringify({
        success: true,
        msg: `password updated.`,
      }),
      {
        status: StatusCodes.ACCEPTED,
      }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
