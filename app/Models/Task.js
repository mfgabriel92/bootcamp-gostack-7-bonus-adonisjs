'use strict'

const Model = use('Model')

class Task extends Model {
  project () {
    return this.belongsTo('App/Models/Project')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  files () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task