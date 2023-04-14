import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'

const USERS_API_URL = 'https://randomuser.me/api'
const RESULTS_NUMBER = 100

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  /**
   * `useRef` -> Guardar un valor que se comparta entre renders, pero que al
   * cambiar no vuelva a renderizar el componente. Si cambia el valor, no se
   * vuelven a renderizar los componentes.
   * - Para acceder al valor de una referencia y cambiarla, lo hacemos con
   *   `current`.
   *
   * ! Es innecesario tener otro estado (`useState`), porque no se va a volver a
   * actualizar o renderizar el valor.
   */
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    // Forma que suele ser necesaria cuando dependemos del mismo valor o
    // queremos hacer otras cosas.
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const fiteredUsers = users.filter((user) => user.email !== email)

    setUsers(fiteredUsers)
  }

  const resetUsers = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    fetch(`${USERS_API_URL}?results=${RESULTS_NUMBER}`)
      .then(async (res) => await res.json())
      .then(({ results }) => {
        setUsers(results)
        originalUsers.current = results
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // Filtrar y luego ordenar usuarios.
  // - Valores derivados del estado. Es un valor que se recalculará cuando
  const filteredUsers = useMemo(() => {
    console.log('filteredUsers memo')
    return typeof filterCountry === 'string' && filterCountry.length > 0
      ? users.filter((user) => {
        return user.location.country
          .toLowerCase()
          .includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  /**
   * `sort` muta el array original, por lo que al volver a ordenar como
   *    originalmente estaba, seguiría ordenado. `toSorted` no está disponible
   *    en todos los navegadores, pero Babel/SWC lo transforman. Este método no
   *    muta el arreglo original.
   * - Otra opción: [...users].sort((a, b) => { ... })
   */
  const sortUsers = (users: User[]) => {
    return SortBy.COUNTRY === sorting
      ? users.toSorted((a, b) => {
        // Comparar strings dependiendo del idioma del usuario.
        // Si lo devolvemos directamente, lo hará de forma ascendente.
        return a.location.country.localeCompare(b.location.country)
      })
      : users
  }

  /**
   * En las dependencias definimos cuáles son los valores que queremos que
   * modifiquen de nuevo el valor de `sortedUsers`. Quiero que la información la
   * memoices y que no la vuelvas a calcular, sino hasta que cambie alguna
   * dependencia.
   */
  const sortedUsers = useMemo(() => {
    console.log('sortedUsers memo')
    return sortUsers(filteredUsers)
  }, [filteredUsers, sorting])

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.COUNTRY
            ? 'No ordenar por país'
            : 'Ordenar por país'}
        </button>
        <button onClick={resetUsers}>Reiniciar estado</button>
        <input
          placeholder="Filtrar por país"
          onChange={(e) => {
            setFilterCountry(e.target.value)
          }}
        />
      </header>
      <UsersList
        changeSorting={handleChangeSort}
        showColors={showColors}
        users={sortedUsers}
        deleteUser={handleDelete}
      />
    </div>
  )
}

export default App
