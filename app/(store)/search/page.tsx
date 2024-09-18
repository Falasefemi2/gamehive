/* eslint-disable react/no-unescaped-entities */
import { searchGames } from '@/app/action'
import Image from 'next/image'
import Link from 'next/link'

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { q: string; page?: string }
}) {
    const query = searchParams.q || ''
    const page = parseInt(searchParams.page || '1', 10)
    const { games, currentPage, totalPages, totalGames } = await searchGames(query, page)

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Search Results</h1>
            {query ? (
                <div>
                    <h2 className="text-2xl font-semibold mt-6 mb-4">Results for "{query}"</h2>
                    {games.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {games.map((game) => (
                                    <Link href={`/game/${game.id}`} key={game.id} className="block hover:opacity-80 transition-opacity">
                                        <div className="border rounded-lg overflow-hidden shadow-md">
                                            <Image
                                                src={game.thumbnail}
                                                alt={game.title}
                                                width={300}
                                                height={200}
                                                layout="responsive"
                                                objectFit="cover"
                                            />
                                            <div className="p-4">
                                                <h3 className="font-semibold text-lg mb-2">{game.title}</h3>
                                                <p className="text-sm text-gray-600">{game.shortDescription}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-6">
                                <p>Page {currentPage} of {totalPages}</p>
                                <p>Total results: {totalGames}</p>
                            </div>
                        </>
                    ) : (
                        <p>No games found.</p>
                    )}
                </div>
            ) : (
                <p>Enter a search query to find games.</p>
            )}
        </div>
    )
}