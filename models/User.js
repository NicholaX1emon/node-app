const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  identity: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  last_login: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('users', UserSchema)

module.exports = User
