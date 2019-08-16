'use strict'

const Route = use('Route')

Route.post('auth', 'SessionController.store')
Route.post('users', 'UserController.store')
Route.post('forgot-password', 'ForgotPasswordController.store')
Route.put('forgot-password', 'ForgotPasswordController.update')
Route.post('uploads', 'FileController.store')
Route.get('uploads/:id', 'FileController.show')
