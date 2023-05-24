import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import { titleCase } from '@/lib/helper'
import User from '@/models/User'
import { StatusCodes } from 'http-status-codes'

export async function POST(request, res) {
  const pathName = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams
  const cookies = request.cookies.getAll()
  const body = await request.json()
  await dbConnect()
  const { email, password } = body
  const user = await User.findOne({ email })
  if (!user) {
    return new Response(
      JSON.stringify({
        success: false,
        msg: `User dose't exist with this email.`,
      }),
      {
        status: StatusCodes.NOT_FOUND,
      }
    )
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    return new Response(
      JSON.stringify({ success: false, msg: 'Unauthorized.' }),
      {
        status: StatusCodes.UNAUTHORIZED,
      }
    )
  }

  const token = await user.createJWT()
  return new Response(
    JSON.stringify({
      success: true,
      msg: `Welcome back ${titleCase(user.name)}`,
      token,
    }),
    {
      status: StatusCodes.success,
    }
  )
}
