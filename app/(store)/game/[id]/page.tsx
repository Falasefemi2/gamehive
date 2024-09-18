import GameDetails from "../gameDetails";

export default async function GamePage({ params }: { params: { id: string } }) {
    return (
        <GameDetails params={params} />
    )
}
