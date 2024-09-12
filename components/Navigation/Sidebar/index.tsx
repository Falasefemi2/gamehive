import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    HomeIcon,
    MagnifyingGlassIcon,
    DashboardIcon,
} from "@radix-ui/react-icons";
import NavLink from "./Navlink";

const links = [
    {
        label: "Home",
        slug: "/",
        svg: <HomeIcon width={24} height={24} />,
    },
    {
        label: "Explore",
        slug: "/search",
        svg: <MagnifyingGlassIcon width={24} height={24} />,
    },
    {
        label: "Library",
        slug: "/library",
        svg: <DashboardIcon width={24} height={24} />,
    },
];
function SideBar() {
    return (
        // <div className="min-h-screen relative">
        <div className="sticky top-0 w-full bg-epic-600 p-4 lg:w-[260px]">
            <div className="p-4 flex items-center justify-center">
                <Link href={"/"}>
                    <Image
                        src={"/Epic-Games-logo.png"}
                        alt="epic games logo"
                        width={60}
                        height={72}
                    />
                </Link>
            </div>
            <div className="flex flex-col mt-6 gap-2 ">
                {links.map((link) => (
                    <NavLink
                        label={link.label}
                        icon={link.svg}
                        slug={link.slug}
                        key={link.slug}
                    />
                ))}
            </div>
        </div>
        // </div>
    );
}

export default SideBar;