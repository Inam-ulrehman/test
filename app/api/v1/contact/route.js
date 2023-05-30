import dbConnect from '@/lib/dbConnect'
import mongooseErrorHandler from '@/lib/errors/mongoose-error-handler'
import { titleCase } from '@/lib/helper'
import Contact from '@/models/Contact'
import { StatusCodes } from 'http-status-codes'

export async function POST(request, res) {
  const body = await request.json()

  const { name, email, mobile, subject, message } = body
  await dbConnect()
  try {
    const contact = await Contact.create({
      name,
      email,
      mobile,
      subject,
      message,
    })

    return new Response(
      JSON.stringify({
        success: true,
        msg: `${titleCase(name)}, your request is submitted...`,
      }),
      {
        status: StatusCodes.success,
      }
    )
  } catch (error) {
    return mongooseErrorHandler(error)
  }
}
