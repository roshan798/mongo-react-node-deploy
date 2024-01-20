const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: false,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  },
)

module.exports = mongoose.model('user', userSchema, 'users')
