'use strict'

const TaskHook = exports = module.exports = {}
const Mail = use('Mail')
const Helpers = use('Helpers')

TaskHook.sendNewTaskEmail = async taskInstance => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  const { title } = taskInstance
  const { email, username } = await taskInstance.user().fetch()
  const file = await taskInstance.files().fetch()

  await Mail.send(
    ['emails.new-task'],
    {
      username,
      title,
      hasAttachment: !!file
    },
    message => {
      message.to(email).from('New Task | GoNode').subject('You have a new task')
      if (file) {
        message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
          filename: file.name
        })
      }
    }
  )
}
