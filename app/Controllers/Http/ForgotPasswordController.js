'use strict'

const Mail = use('Mail')
const User = use('App/Models/User')
const crypto = require('crypto')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const url = request.input('redirect_url')
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(18).toString('hex')
      user.token_created_at = new Date()

      await user.save()
      await Mail.send(
        ['emails.forgot-password'],
        {
          email,
          token: user.token,
          link: `${url}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('no-reply@gonode.com')
            .subject('Password Recovery | GoNode')
        }
      )
    } catch (error) {
      return response.status(error.status).send({ error: { message: error.message } })
    }
  }
}

module.exports = ForgotPasswordController
