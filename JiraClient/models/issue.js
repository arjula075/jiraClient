const mongoose = require('mongoose')

const issueSchema = new mongoose.Schema({
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    summary: String,
    issuetype:  { type: mongoose.Schema.Types.ObjectId, ref: 'Issuetype' },
    reporter: ,
    priority: ,
    description: ,

  }
  username: String,
  name: String,
  adult: Boolean,
  passwordHash: String,
})

issueSchema.statics.format = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    adult: user.adult === undefined ? true : user.adult,
  }
}

const User = mongoose.model('User', userSchema)

module.exports = Issue
