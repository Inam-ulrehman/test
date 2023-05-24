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

  const { name, email, password } = body
  await dbConnect()
  const isFirstAccount = await User.countDocuments({})
  const role = isFirstAccount === 0 ? 'admin' : 'user'
  if (!name || !email || !password) {
    return new Response(JSON.stringify({ msg: 'Missing Details.' }), {
      status: StatusCodes.BAD_REQUEST,
    })
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
      role,
    })
    const token = await user.createJWT()
    return new Response(
      JSON.stringify({
        success: true,
        msg: `Welcome ${titleCase(name)}`,
        token,
      }),
      {
        status: StatusCodes.success,
      }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
