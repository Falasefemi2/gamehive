"use client";

import React from "react";
import { Carousel, Card } from "../banner-thumbnails";
import Image from "next/image";

export const BannerGames = ({ games }) => {
    const cards = games.map((game) => ({
        category: "Game",
        title: game.title,
        src: game.thumbnail,
        content: <GameContent game={game} />,
    }));

    const carouselCards = cards.map((card, index) => (
        <Card key={card.src} card={card} index={index} layout={true} />
    ));

    return (
        <div className="w-full h-full">
            <h2 className="max-w-7xl pl-4 mx-auto md:text-5xl font-sans mb-8 font-medium text-2xl my-6 mt-16">
                Featured Games
            </h2>
            <Carousel items={carouselCards} />
        </div>
    );
};

const GameContent = ({ game }) => {
    return (
        <div className="bg-epic-600 p-8 md:p-14 rounded-3xl mb-4">
            <p className="text-base md:text-2xl font-sans max-w-3xl mx-auto">
                <span className="font-bold">{game.title}</span>{" "}
                {game.shortDescription}
            </p>
            <Image
                src={game.thumbnail}
                alt={game.title}
                height="500"
                width="500"
                className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
        </div>
    );
};