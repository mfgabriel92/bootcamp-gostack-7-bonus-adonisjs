'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')
const Youch = require('youch')

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const toJson = await youch.toJSON()
      return response.status(error.status).send(toJson)
    }

    return response.status(error.status)
  }

  async report (error, { request }) {
    console.error(error)
  }
}

module.exports = ExceptionHandler
