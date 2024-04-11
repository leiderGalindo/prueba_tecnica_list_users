import { SortBy, type User } from '../types.d'
import { UserRow } from './UserRow'

interface Props {
  users: User[]
  showColors: boolean
  deleteUser: (email: string) => void
  changeSorting: (value: SortBy) => void
}

export const UserList = ({ users, showColors, deleteUser, changeSorting }: Props) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <td>Foto</td>
          <td className='pointer' onClick={() => { changeSorting(SortBy.NAME) }}>Nombre</td>
          <td className='pointer' onClick={() => { changeSorting(SortBy.LAST) }}>Apellido</td>
          <td className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY) }}>País</td>
          <td>Acciones</td>
        </tr>
      </thead>
      <tbody className={showColors ? 'table--showColors' : 'table'}>
        {users.map((user, index) => {
          return (
            <UserRow key={user.email} user={user} deleteUser={deleteUser} />
          )
        })}
      </tbody>
    </table>
  )
}
