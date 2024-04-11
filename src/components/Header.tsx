import { SortBy } from '../types.d'

interface Props {
  showColors: boolean
  onShowColors: (value: boolean) => void
  sorting: SortBy
  onSorting: (value: SortBy) => void
  onFilterCountry: (value: string) => void
  onReset: () => void
}

export const Header = ({ showColors, onShowColors, sorting, onSorting, onReset, onFilterCountry }: Props) => {
  const toggleSorting = () => {
    const newSortingValue = ((sorting === SortBy.NONE) ? SortBy.COUNTRY : SortBy.NONE)
    onSorting(newSortingValue)
  }

  return (
    <header style={{ marginBottom: '20px' }}>
        <button onClick={() => { onShowColors(!showColors) }}>Colorear filas</button>
        <button onClick={toggleSorting }>
          { sorting === SortBy.COUNTRY ? 'No ordenar por pais' : 'Ordenar por pais' }
        </button>
        <button onClick={onReset }>Resetear estado</button>
        <input type="text" placeholder="Filtrar por país" onChange={(e) => {
          onFilterCountry(e.target.value)
        }} />
    </header>
  )
}
