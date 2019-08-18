'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async index ({ params, response }) {
    try {
      const tasks = await Task.query()
        .where('project_id', params.projects_id)
        .with('user')
        .fetch()

      return tasks
    } catch (error) {
      return response.status(error.status).send({ error: { message: error.message } })
    }
  }

  async store ({ params, request, response }) {
    const data = request.only(['user_id', 'title', 'description', 'due_date', 'file_id'])
    const task = await Task.create({ ...data, project_id: params.projects_id })

    return task
  }

  async show ({ params, response }) {
    try {
      const task = await Task.findOrFail(params.id)
      await task.load('user')
      await task.load('files')

      return task
    } catch (error) {
      return response.status(error.status).send({ error: { message: error.message } })
    }
  }

  async update ({ params, request, response }) {
    try {
      const data = request.only(['user_id', 'title', 'description', 'due_date', 'file_id'])
      const task = await Task.findOrFail(params.id)

      task.merge(data)
      await task.save()

      return task
    } catch (error) {
      return response.status(error.status).send({ error: { message: error.message } })
    }
  }

  async destroy ({ params, response }) {
    try {
      const task = await Task.findOrFail(params.id)
      await task.delete()
    } catch (error) {
      return response.status(error.status).send({ error: { message: error.message } })
    }
  }
}

module.exports = TaskController
