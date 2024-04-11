import { type User } from '../types'

interface Props {
  user: User
  deleteUser: (email: string) => void
}

export const UserRow = ({ user, deleteUser }: Props) => {
  return (
    <>
      <tr>
        <td>
            <img src={user.picture.thumbnail} alt="user" />
        </td>
        <td>{user.name.first}</td>
        <td>{user.name.last}</td>
        <td>{user.location.country}</td>
        <td>
          <button onClick={() => { deleteUser(user.email) }}>Borrar</button>
        </td>
      </tr>
    </>
  )
}
