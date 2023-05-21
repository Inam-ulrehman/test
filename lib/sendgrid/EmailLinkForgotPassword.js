import { websiteContent } from '@/utils/data'
const sgMail = require('@sendgrid/mail')
const { hostName, hostEmail, hostWebsite } = websiteContent.sendGrid

const EmailLinkForgotPassword = ({ email, forgotPasswordId }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: { email },
    from: {
      email: hostEmail,
      name: hostName,
    },

    subject: 'Reset password link',
    text: hostName,
    html: ` <div>
        <p>
          <strong>Reset your password.</strong>
        </p>
        <p>
          Please Click here to reset your password.<a href=${hostWebsite}/user/changepassword/${forgotPasswordId}>
            Verify
          </a>
        </p>
      </div>`,
  }
  const result = sgMail
    .send(msg)
    .then((data) => {
      return { msg: 'success', data }
    })
    .catch((error) => {
      return { msg: 'error', error }
    })

  return result
}

export default EmailLinkForgotPassword
