import { BannerGames } from "@/components/FeaturedGames/BannerGames";
import { getSevenGameThumbnails } from "@/app/action";
import { auth } from "@clerk/nextjs/dist/types/server";
import { redirect } from "next/navigation";


export default async function Home() {
    const games = await getSevenGameThumbnails();

    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    return (
        <>
            <BannerGames games={games} />
        </>
    )
}