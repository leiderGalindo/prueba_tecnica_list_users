import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUser } from '../services/Users'
import { type User } from '../types.d'

export const useUsers = () => {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch
  } = useInfiniteQuery<{ nextCursor?: number, users: User[] }>({
    queryKey: ['users'], // <- la key de la la informacion o de la query
    queryFn: async ({ pageParam }: { pageParam: number }) => await fetchUser({ pageParam }), // <- como traer la información
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false
  })

  const users: User[] = data?.pages?.flatMap(page => page.users) ?? []

  return {
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    users,
    fetchNextPage,
    refetch
  }
}
