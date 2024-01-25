const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8000
const User = require('./userModal.js')
const connectDB = require('./database.js')
app.use(express.json({ limit: '8mb' }))

const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  credentials: true,
};
app.use(cors())
connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).send('Server Error')
  }
})

// {
//   name : "roshan kumar",
// }

app.post('/api/users', async (req, res) => {
  const { name } = req.body
  try {
    let user = new User({
      name,
    })
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(500).send('Server Error')
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
