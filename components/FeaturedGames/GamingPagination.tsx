'use client'

import { getAllGamesWithPagination } from '@/app/action'
import GamingCard from '@/components/FeaturedGames/GamingCard'
import { Button } from "@/components/ui/button"
import { useInfiniteQuery } from '@tanstack/react-query'

export default function GamesPagination({ initialGames, initialTotalPages, initialPageSize, initialTotalGames }) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['games'],
        queryFn: ({ pageParam = 1 }) => getAllGamesWithPagination(pageParam),
        getNextPageParam: (lastPage, pages) => {
            if (pages.length < lastPage.totalPages) {
                return pages.length + 1
            }
            return undefined
        },
        initialData: {
            pages: [{
                allGame: initialGames,
                totalPages: initialTotalPages,
                currentPage: 1,
                pageSize: initialPageSize,
                totalGames: initialTotalGames
            }],
            pageParams: [1],
        },
        initialPageParam: 1,
    })

    const games = data?.pages.flatMap(page => page.allGame) ?? []

    const handleLoadMore = () => {
        if (hasNextPage) {
            fetchNextPage()
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                {games.map(game => (
                    <GamingCard
                        key={game.id}
                        id={game.id}
                        imagePath={game.thumbnail}
                        title={game.title}
                        description={game.shortDescription}
                    />
                ))}
            </div>
            {games.length >= 12 && hasNextPage && (
                <div className="flex justify-center mt-4">
                    <Button
                        onClick={handleLoadMore}
                        disabled={isFetchingNextPage}
                        className="mt-4"
                    >
                        {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </Button>
                </div>
            )}
        </div>

    )
}
