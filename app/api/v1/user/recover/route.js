import dbConnect from '@/lib/dbConnect'
const sgMail = require('@sendgrid/mail')
import User from '@/models/User'
import { StatusCodes } from 'http-status-codes'
import Email from './email'

export async function POST(request, res) {
  const body = await request.json()
  await dbConnect()
  const { email } = body

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

  const token = await user.recoverJWT()

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = Email(user, token)

  try {
    const result = await sgMail.send(msg)

    return new Response(
      JSON.stringify({
        success: true,
        msg: ` Reset password instructions sent to your email`,
        result,
      }),
      {
        status: StatusCodes.success,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        msg: `Email service provider sending Error`,
        error: error,
      }),
      {
        status: StatusCodes.BAD_REQUEST,
      }
    )
  }
}
