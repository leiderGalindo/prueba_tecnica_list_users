import { useMemo, useState } from 'react'
import { UserList } from './components/UserList'
import { Header } from './components/Header'
import { SortBy, type User } from './types.d'
import './App.css'
import { useUsers } from './hooks/useUsers'

function App () {
  const { isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage, refetch, users } = useUsers()
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterByCountry, setFilterByCountry] = useState<string | null>(null)

  // const originalUsers = useRef<User[]>([])
  // useRef -> para guardar un valor
  // que queremos que se comparta entre renderizados
  // pero que al cambiar, no vuelva a renderizar el componente

  // Eliminat usuario
  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user, indexUser) => user.email !== email)
    // setUsers(filteredUsers)
  }

  // Resetear la lista de usuarios
  const handleReset = async () => {
    await refetch()
  }

  // Realiza el cambio de ordenamiento
  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  // Filtrar usuarios
  const filterUsers = useMemo(() => {
    return typeof filterByCountry === 'string' && filterByCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterByCountry.toLowerCase())
      })
      : users
  }, [users, filterByCountry])

  // Realiza el ordenamiento de los usuarios por el pais
  // toSorted: ordena el array y retorna una copia del mismo
  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filterUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filterUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [sorting, filterUsers])

  return (
    <>
      <div className='App'>
        <h1>Prueba tecnica</h1>
        <Header
          showColors={showColors} onShowColors={setShowColors}
          sorting={sorting} onSorting={setSorting}
          onFilterCountry={setFilterByCountry}
          onReset={() => handleReset}
        ></Header>
        <main>
          { users.length > 0 &&
            <UserList deleteUser={handleDelete} showColors={showColors} users={sortedUsers} changeSorting={handleChangeSort} />
          }
          {(isLoading || isFetchingNextPage) && <p>Cargando...</p>}
          {isError && <p>Ha habido un error</p>}
          {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}

          {!isLoading && !isError && !isFetchingNextPage && hasNextPage &&
            <button onClick={() => { void fetchNextPage() }}>Cargar más resultados</button>
          }
        </main>
      </div>
    </>
  )
}

export default App
