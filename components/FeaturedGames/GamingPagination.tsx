'use client'

import { useState, useEffect } from 'react'
import { getAllGamesWithPagination } from '@/app/action'
import GamingCard from '@/components/FeaturedGames/GamingCard'

export default function GamesPagination({ initialGames, initialTotalPages }) {
    const [games, setGames] = useState(initialGames)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(initialTotalPages)

    useEffect(() => {
        if (currentPage > 1) {
            loadGames(currentPage)
        }
    }, [currentPage])

    const loadGames = async (page: number) => {
        const result = await getAllGamesWithPagination(page)
        setGames(prevGames => [...prevGames, ...result.allGame])
        setTotalPages(result.totalPages)
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {games.map(game => (
                <GamingCard
                    key={game.id}
                    imagePath={game.thumbnail}
                    title={game.title}
                    description={game.shortDescription}
                    onNextPage={handleNextPage}
                    hasNextPage={currentPage < totalPages}
                />
            ))}
        </div>
    )
}