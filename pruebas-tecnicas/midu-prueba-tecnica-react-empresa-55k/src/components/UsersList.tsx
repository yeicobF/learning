import { type User } from '../types.d'

interface Props {
  users: User[]
}

// table, thead, tbody <- key elements in a table.
// tr <- table row
// th <- table header
// td <- table data (cell)
export function UsersLists ({ users }: Props) {
  return (<table>
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
      {
        users.map(user => {
          return (
            <tr key={user.id.value}>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>
                {user.name.first}
              </td>
              <td>
                {user.name.last}
              </td>
              <td>
                {user.location.country}
              </td>
              <td>
                <button>Borrar</button>
              </td>
            </tr>
          )
        })
      }
    </tbody>
  </table>
  )
}
