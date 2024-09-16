import { BannerGames } from "@/components/FeaturedGames/BannerGames";
import { getAllGamesWithPagination, getSevenGameThumbnails } from "@/app/action";
import GamesPagination from "@/components/FeaturedGames/GamingPagination";
// import GamesPagination from "@/components/GamesPagination";

export default async function Home() {
    const games = await getSevenGameThumbnails();
    const initialGamesData = await getAllGamesWithPagination();

    return (
        <>
            <BannerGames games={games} />
            <h2>All Games</h2>
            <GamesPagination
                initialGames={initialGamesData.allGame}
                initialTotalPages={initialGamesData.totalPages}
            />
        </>
    )
}