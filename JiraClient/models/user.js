const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  adult: Boolean,
  passwordHash: String,
})

userSchema.statics.format = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    adult: user.adult === undefined ? true : user.adult,
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User
