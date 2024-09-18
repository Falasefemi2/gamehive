import { BannerGames } from "@/components/FeaturedGames/BannerGames";
import { getAllGamesWithPagination, getSevenGameThumbnails } from "@/app/action";
import GamesPagination from "@/components/FeaturedGames/GamingPagination";
// import { CheckUser } from '@/lib/checkUser';
// import { redirect } from 'next/navigation';

export default async function Home() {
    // const user = await CheckUser();

    // if (!user) {
    //     redirect('/sign-up');
    // }

    const games = await getSevenGameThumbnails();
    const initialGamesData = await getAllGamesWithPagination(1, 12); // Specify 12 games per page

    return (
        <>
            <BannerGames games={games} />
            <h2>All Games</h2>
            <GamesPagination
                initialGames={initialGamesData.allGame}
                initialTotalPages={initialGamesData.totalPages}
                initialPageSize={12}
                initialTotalGames={initialGamesData.totalGames}
            />
        </>
    )
}