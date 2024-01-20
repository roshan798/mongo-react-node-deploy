const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000
const User = require('./userModal.js')
const connectDB = require('./database.js')
app.use(express.json({ limit: '8mb' }))
// Enable CORS for the React app at http://localhost:5173
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users', async (req, res) => {
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

app.post('/users', async (req, res) => {
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
