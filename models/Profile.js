const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Create Schema
const ProfileSchema = new Schema({
  type: {
    type: String,
  },
  desc: {
    type: String,
  },
  income: {
    type: String,
    required: true
  },
  expense: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  comment: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Profile = mongoose.model('profiles', ProfileSchema)

module.exports = Profile
