interface props {
  pageParam?: number
}

export const fetchUser = async ({ pageParam = 1 }: props) => {
  return await fetch(`https://randomuser.me/api?results=10&seed=leiderGalindo&page=${pageParam}`)
    .then(async res => {
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })
    .then(res => {
      const currentPage = Number(res.info.page)
      const nextCursor = ((currentPage > 3) ? undefined : currentPage + 1)

      return {
        users: res.results,
        nextCursor
      }
    })
}
