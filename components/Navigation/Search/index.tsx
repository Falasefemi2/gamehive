'use client'
import { Input } from '@/components/ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

type Props = {
    className?: string
    onSearchChange?: (key: string, value: string) => void
    defaultValue?: string
    basePath?: string
}

function SearchBar({ className }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleSearch = (value: string) => {
        const params = new URLSearchParams(searchParams)
        if (value) {
            params.set('q', value)
        } else {
            params.delete('q')
        }
        router.push(`/search?${params.toString()}`)
    }

    return (
        <div className="relative">
            <Input
                defaultValue={searchParams.get('q') || ''}
                className={cn('w-full max-w-xs pr-10', className)}
                placeholder="Search the library"
                onChange={(e) => handleSearch(e.target.value)}
            />
            <MagnifyingGlassIcon
                className="absolute right-3 top-3"
                width={16}
                height={16}
            />
        </div>
    )
}

export default SearchBar
