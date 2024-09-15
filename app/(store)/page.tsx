import { BannerGames } from "@/components/FeaturedGames/BannerGames";
import { getSevenGameThumbnails } from "@/app/action";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";


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