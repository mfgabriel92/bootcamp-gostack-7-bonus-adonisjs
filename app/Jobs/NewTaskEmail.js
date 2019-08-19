'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskEmail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'NewTaskEmail-job'
  }

  async handle ({ username, title, email, file }) {
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
}

module.exports = NewTaskEmail
