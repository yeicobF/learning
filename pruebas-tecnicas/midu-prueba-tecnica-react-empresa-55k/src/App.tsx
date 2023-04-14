import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { UsersLists } from './components/UsersList'

const USERS_API_URL = 'https://randomuser.me/api'

function App () {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch(`${USERS_API_URL}?results=100`)
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <UsersLists users={users} />
    </div>
  )
}

export default App
