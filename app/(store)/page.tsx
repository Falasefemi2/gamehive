import { BannerGames } from "@/components/FeaturedGames/BannerGames";
import { getSevenGameThumbnails } from "@/app/action";

export default async function Home() {
    const games = await getSevenGameThumbnails();

    return (
        <>
            <BannerGames games={games} />
        </>
    )
}