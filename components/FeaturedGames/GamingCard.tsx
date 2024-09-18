"use client";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
// import { addGameToLibrary } from "./actions"
import { useTransition } from "react"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { addGameToLibrary } from "@/app/action";

interface IAppProps {
    id: number
    imagePath: string
    description: string
    title: string
    isInLibrary?: boolean
    libraryId?: string | undefined
    onNextPage?: () => void
    hasNextPage?: boolean
}

export default function GamingCard({ id, imagePath, description, title, isInLibrary }: IAppProps) {
    const [isPending, startTransition] = useTransition()
    const { user } = useUser()
    const [inLibrary, setInLibrary] = useState(isInLibrary)

    const handleAddToLibrary = async () => {
        startTransition(async () => {
            try {
                await addGameToLibrary(id)
                setInLibrary(true)
            } catch (error) {
                console.error("Failed to add game to library:", error)
            }
        })
    }

    return (
        <Card className="w-[300px] relative">
            <CardHeader className="p-0">
                <div className="relative h-[200px] w-full">
                    <Image src={imagePath} alt={title} layout="fill" objectFit="cover" />
                    {!inLibrary && (
                        <form action={handleAddToLibrary}>
                            <Button
                                type="submit"
                                className="absolute top-2 right-2"
                                disabled={isPending || !user}
                            >
                                {isPending ? "Adding..." : "Add to Favorites"}
                            </Button>
                        </form>
                    )}
                    {inLibrary && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded">
                            In Library
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
                <p className="text-sm line-clamp-2">{description}</p>
            </CardContent>
            <CardFooter>
                <Link href={`/game/${id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}