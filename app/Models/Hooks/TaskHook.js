'use strict'

const TaskHook = exports = module.exports = {}
const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskEmail')

TaskHook.sendNewTaskEmail = async taskInstance => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  const { title } = taskInstance
  const { email, username } = await taskInstance.user().fetch()
  const file = await taskInstance.files().fetch()

  Kue.dispatch(Job.key, { title, email, username, file }, { attempts: 3 })
}
