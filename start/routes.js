'use strict'

const Route = use('Route')

Route.post('auth', 'SessionController.store')
Route.post('users', 'UserController.store')
Route.post('forgot-password', 'ForgotPasswordController.store')
