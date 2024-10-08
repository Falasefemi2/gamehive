import { Navbar, SideBar } from "@/components/Navigation";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="relative flex flex-row gap-4 bg-epic-500">
                <div className="min-h-screen relative hidden xl:block">
                    <SideBar />
                </div>
                <div className="p-4 py-4 flex-grow max-w-[1440px] mx-auto md:p-8 md:py-4  lg:p-16 lg:py-8">
                    <Navbar />
                    {children}
                </div>
            </div>
        </>
    );
}

export default Layout;