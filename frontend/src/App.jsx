import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3000/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }, [])

  const handleSubmit = () => {
    axios
      .post('http://localhost:3000/users', { name })
      .then((response) => {
        setUsers([...users, response.data])
        setName('')
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }

  return (
    <>
      <div>
        <h2>Users:</h2>
        {users.map((user, index) => (
          <div key={index}>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  )
}

export default App
