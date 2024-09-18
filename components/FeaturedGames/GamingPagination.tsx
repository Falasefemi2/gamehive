'use client'

import { useState, useEffect } from 'react'
import { getAllGamesWithPagination } from '@/app/action'
import GamingCard from '@/components/FeaturedGames/GamingCard'
import { Button } from "@/components/ui/button"

export default function GamesPagination({ initialGames, initialTotalPages }) {
    const [games, setGames] = useState(initialGames)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(initialTotalPages)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (currentPage > 1) {
            loadGames(currentPage)
        }
    }, [currentPage])

    const loadGames = async (page: number) => {
        setIsLoading(true)
        const result = await getAllGamesWithPagination(page)
        setGames(prevGames => [...prevGames, ...result.allGame])
        setTotalPages(result.totalPages)
        setIsLoading(false)
    }


    const handleLoadMore = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {games.map(game => (
                    <GamingCard
                        key={game.id}
                        imagePath={game.thumbnail}
                        title={game.title}
                        description={game.shortDescription}
                    />
                ))}
            </div>
            {games.length >= 12 && currentPage < totalPages && (
                <Button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="mt-4"
                >
                    {isLoading ? 'Loading...' : 'Load More'}
                </Button>
            )}
        </div>
    )
}