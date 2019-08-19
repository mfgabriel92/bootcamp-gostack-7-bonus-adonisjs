'use strict'

const Route = use('Route')

Route.post('auth', 'SessionController.store').validator('Session')
Route.post('users', 'UserController.store').validator('User')

Route.post('forgot-password', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('forgot-password', 'ForgotPasswordController.update').validator('ResetPassword')

Route.group(() => {
  Route.post('uploads', 'FileController.store')
  Route.get('uploads/:id', 'FileController.show')
  Route.resource('projects', 'ProjectController').apiOnly().validator(new Map([[['projects.store'], ['Project']]]))
  Route.resource('projects.tasks', 'TaskController').apiOnly().validator(new Map([[['projects.tasks.store'], ['Task']]]))
}).middleware(['auth'])
