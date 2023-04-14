import { SortBy, type User } from '../types.d'

interface Props {
  changeSorting: (sort: SortBy) => void
  deleteUser: (email: string) => void
  showColors: boolean
  users: User[]
}

interface TableHeader {
  label: string
  sortBy?: SortBy
}

const TABLE_HEADERS: Record<string, TableHeader> = {
  picture: {
    label: 'Foto'
  },
  name: {
    label: 'Nombre',
    sortBy: SortBy.NAME
  },
  last: {
    label: 'Apellido',
    sortBy: SortBy.LAST
  },
  country: {
    label: 'País',
    sortBy: SortBy.COUNTRY
  },
  actions: {
    label: 'Acciones'
  }
}

// table, thead, tbody <- key elements in a table.
// tr <- table row
// th <- table header
// td <- table data (cell)
export function UsersList ({
  changeSorting,
  deleteUser,
  showColors,
  users
}: Props) {
  return (
    <table width="100%">
      <thead>
        <tr>
          {Object.values(TABLE_HEADERS).map(({ label, sortBy }) => {
            return (
              <th
                key={label}
                onClick={() => {
                  sortBy && changeSorting(sortBy)
                }}
                className={sortBy && 'pointer'}
              >
                {label}
              </th>
            )
          })}
        </tr>
      </thead>

      <tbody className={showColors ? 'table--showColors' : 'table'}>
        {users.map((user) => {
          return (
            // Use `email` or `uuid` as key, because they are unique.
            <tr key={user.email}>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    deleteUser(user.email)
                  }}
                >
                  Borrar
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
