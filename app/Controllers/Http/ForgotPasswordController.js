'use strict'

const Mail = use('Mail')
const User = use('App/Models/User')
const crypto = require('crypto')
const { differenceInDays } = require('date-fns')

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

  async update ({ request, response }) {
    try {
      const { token, password } = request.all()
      const user = await User.findByOrFail('token', token)
      const isTokenExpired = differenceInDays(user.token_created_at, new Date()) > 2

      if (isTokenExpired) {
        return response.status(401).send({ error: 'The token has expired' })
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()
    } catch (error) {
      return response.status(error.status).send({ error: { message: error.message } })
    }
  }
}

module.exports = ForgotPasswordController
