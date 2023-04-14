import { useEffect, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { UsersList } from './components/UsersList'

const USERS_API_URL = 'https://randomuser.me/api'
const RESULTS_NUMBER = 100

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState<boolean>(false)
  const [sortByCountry, setSortByCountry] = useState<boolean>(false)

  console.log({ showColors })

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    // Forma que suele ser necesaria cuando dependemos del mismo valor o
    // queremos hacer otras cosas.
    setSortByCountry((previousState) => !previousState)
  }

  useEffect(() => {
    fetch(`${USERS_API_URL}?results=${RESULTS_NUMBER}`)
      .then(async (res) => await res.json())
      .then((res) => {
        setUsers(res.results)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const sortedUsers = sortByCountry
    // `sort` muta el array original, por lo que al volver a ordenar como
    // originalmente estaba, seguiría ordenado. `toSorted` no está disponible en
    // todos los navegadores, pero Babel/SWC lo transforman. Este método no muta
    // el arreglo original.
    // - Otra opción: [...users].sort((a, b) => { ... })
    ? users.toSorted((a, b) => {
      // Comparar strings dependiendo del idioma del usuario.
      // Si lo devolvemos directamente, lo hará de forma ascendente.
      return a.location.country.localeCompare(b.location.country)
    })
    : users

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
      </header>
      <UsersList showColors={showColors} users={sortedUsers} />
    </div>
  )
}

export default App
