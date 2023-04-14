import { type User } from '../types.d'

interface Props {
  deleteUser: (email: string) => void
  showColors: boolean
  users: User[]
}

// table, thead, tbody <- key elements in a table.
// tr <- table row
// th <- table header
// td <- table data (cell)
export function UsersList ({ deleteUser, showColors, users }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? '#333' : '#555'
          const color = showColors ? backgroundColor : 'transparent'
          console.log(color)

          return (
            // Use `email` or `uuid` as key, because they are unique.
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => {
                  deleteUser(user.email)
                }}>Borrar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
