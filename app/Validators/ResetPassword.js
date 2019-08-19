'use strict'

class ResetPassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      token: 'required',
      password: 'require|confirm'
    }
  }
}

module.exports = ResetPassword
