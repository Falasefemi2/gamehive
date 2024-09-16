import { BannerGames } from "@/components/FeaturedGames/BannerGames";
import { getAllGamesWithPagination, getSevenGameThumbnails } from "@/app/action";
import GamingCard from "@/components/FeaturedGames/GamingCard";

export default async function Home() {
    const games = await getSevenGameThumbnails();
    const allGames = await getAllGamesWithPagination();

    return (
        <>
            <BannerGames games={games} />
            <h2>All Games</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {allGames.allGame.map((game) => (
                    <GamingCard
                        key={game.id}
                        imagePath={game.thumbnail}
                        description={game.shortDescription}
                        title={game.title}
                    />
                ))}
            </div>
        </>
    )
}