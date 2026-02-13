'use client';

import { LinkButton } from "./molecules";
import { usePathname } from 'next/navigation'

export default function Nav() {

    const pathname = usePathname();
    const isRootPage = pathname === "/";

    return (
        <nav className="fixed top-0 left-0 w-full bg-white dark:bg-black border-gray-700 border-b dark:hover:bg-white/10 transition-colors duration-300">
            <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
                <LinkButton href="/">Save your music</LinkButton>

                {!isRootPage &&
                    <div className="flex gap-4 items-center">
                        <LinkButton href="/migrate">Migrate</LinkButton>
                    </div>
                }
            </div>
        </nav>
    );
}
