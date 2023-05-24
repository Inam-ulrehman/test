import React from 'react'

const Email = (user, token) => {
  const msg = {
    to: user.email,
    from: {
      email: 'no-replay@inamwebsolutions.com',
      name: 'Car Sell',
    },
    subject: `Password recovery`,
    // text: '',
    html: ` <div>
        <p>
          <strong>Reset your password.</strong>
        </p>
        <p>
          Please Click here to reset your password.<a href=${process.env.NEXT_PUBLIC_WEBSITE}/recover/${token}>
            Verify your account.
          </a>
        </p>
      </div>`,
  }

  return msg
}

export default Email
