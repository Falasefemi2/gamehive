'use client'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from '@/components/ui/sheet'
import { buttonVariants } from '@/components/ui/button'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { usePathname } from 'next/navigation'
import SideBar from '..'

function MobileNav() {
    const pathName = usePathname()
    return (
        <div className="block xl:hidden" key={pathName}>
            <Sheet>
                <SheetTrigger className={buttonVariants({ variant: 'ghost' })}>
                    <HamburgerMenuIcon width={30} height={30} />
                </SheetTrigger>
                <SheetContent side={'left'} className="bg-epic-500 p-0">
                    <SheetHeader className="p-4"></SheetHeader>
                    <SideBar />
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNav
