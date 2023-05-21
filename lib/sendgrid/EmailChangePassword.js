import { websiteContent } from '@/utils/data'
const sgMail = require('@sendgrid/mail')
const { hostName, hostEmail, hostWebsite } = websiteContent.sendGrid

const EmailChangePassword = ({ email }) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: { email },
    from: {
      email: hostEmail,
      name: hostName,
    },
    subject: 'Password updated',
    text: hostName,
    html: ` <div>
        <p>
          <strong>Your Password is Changed.</strong>
        </p>
        <p>
          Please contact customer support if you did not change your password.
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

export default EmailChangePassword
