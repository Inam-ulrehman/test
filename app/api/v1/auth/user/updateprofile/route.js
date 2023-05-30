import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'

import User from '@/models/User'
import { StatusCodes } from 'http-status-codes'
import { headers } from 'next/headers'

export async function PATCH(request, res) {
  await dbConnect()
  const body = await request.json()
  const headersList = headers()
  const _id = headersList.get('userId')

  const {
    name,
    lastName,
    gender,
    dob,
    apartment,
    house,
    street,
    city,
    province,
    country,
    postalCode,
    mobile,
    email,
  } = body
  try {
    const user = await User.findOneAndUpdate(
      { _id },
      {
        name,
        lastName,
        gender,
        dob,
        apartment,
        house,
        street,
        city,
        province,
        country,
        postalCode,
        mobile,
        email,
      }
    )
    return new Response(
      JSON.stringify({
        success: true,
        msg: `profile updated.`,
      }),
      {
        status: StatusCodes.ACCEPTED,
      }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
