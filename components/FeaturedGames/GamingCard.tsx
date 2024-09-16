import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface IAppProps {
    imagePath: string
    description: string
    title: string
    userId?: string | undefined
    isInLibrary?: boolean
    libraryId?: string | undefined
    onNextPage?: () => void
    hasNextPage?: boolean
}

export default function GamingCard({ imagePath, description, title, onNextPage, hasNextPage }: IAppProps) {
    return (
        <Card className="w-[300px] relative">
            <CardHeader className="p-0">
                <div className="relative h-[200px] w-full">
                    <Image src={imagePath} alt={title} layout="fill" objectFit="cover" />
                    <Button size="icon" variant="ghost" className="absolute top-2 right-2 text-white hover:text-red-500">
                        <Heart className="h-6 w-6" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
                <p className="text-sm line-clamp-2">{description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button className="flex-1">Buy Now</Button>
                {hasNextPage && (
                    <Button onClick={onNextPage} variant="outline" className="ml-2">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}