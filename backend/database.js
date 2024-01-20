const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB successfully')
  } catch (error) {
    console.error('Error connecting to MongoDB:')
  }
}

module.exports = connectDB
