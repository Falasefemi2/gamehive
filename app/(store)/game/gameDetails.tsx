import { getGameById } from "@/app/action";
import Image from "next/image";
import { notFound } from 'next/navigation';

export default async function GameDetails({ params }: { params: { id: string } }) {
    const gameId = parseInt(params.id, 10);
    const game = await getGameById(gameId);

    if (!game) {
        notFound();
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{game.title}</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <Image
                        src={game.thumbnail}
                        alt={game.title}
                        width={500}
                        height={300}
                        layout="responsive"
                        objectFit="cover"
                    />
                </div>
                <div className="md:w-1/2">
                    <p className="text-lg mb-4">{game.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h2 className="font-semibold">Genre</h2>
                            <p>{game.genre}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold">Publisher</h2>
                            <p>{game.publisher}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold">Developer</h2>
                            <p>{game.developer}</p>
                        </div>
                        <div>
                            <h2 className="font-semibold">Release Date</h2>
                            <p>{new Date(game.releaseDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <a
                        href={game.gameUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-block bg-primary text-black px-4 py-2 rounded hover:bg-primary/90"
                    >
                        Play Game
                    </a>
                </div>
            </div>
        </div>
    );
}
