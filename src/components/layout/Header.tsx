"use client"

import { usePathname } from "next/navigation";
import SearchEventInput1 from "../custom-utils/inputs/event-search/SearchEventInput1";
import Logo from "./Logo";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { NAV_LINKS, navLinks } from "@/components-data/navigation/navLinks";
import { useState } from "react";
import MobileMenu from "./MobileMenu";
import logoSrc from "@/public-assets/logo/qavtix-logo.svg"
import { containsEventPage } from "@/helper-fns/pathNameResolvers";

export default function Header(){

    const pathName = usePathname()
    const [showMobileMenu,setShowMobileMenu] = useState(false)

    const isActive = (href: string) => {
        if (href === '/') {
            return pathName === href
        }
        return pathName.startsWith(href)
    }



    // Show header only on non-auth pages, homepage and event routes
    return (
        !pathName.startsWith("/auth") &&
            (
                pathName === "/" ||
                containsEventPage(pathName)
            )
        ) && (
        <header className="py-8 w-full absolute top-0 left-0 z-100 flex justify-between items-center global-px">
            <div className="flex items-center gap-8">
                <Logo logo={logoSrc} />
                <SearchEventInput1 className="hidden lg:block" />
            </div>
            <nav className="items-center gap-1 hidden lg:flex">
                {navLinks.map((link) => {
                    const active = isActive(link.href)

                    // CTA Button Style
                    if (link.type === 'cta') {
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="ml-4 px-6 py-4 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary-7 hover:shadow-md active:bg-primary-8 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-150"
                            >
                                {link.label}
                            </Link>
                        )
                    }

                    // Default Link Style
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`
                                px-4 py-2 rounded-lg text-sm transition-all duration-150
                                ${active
                                    ? 'text-neutral-8'
                                    : 'text-secondary-4 hover:text-primary-7'
                                }
                                active:scale-[0.98]
                                focus:outline-none focus:ring-2 focus:ring-neutral-4 focus:ring-offset-2
                            `}
                        >
                            {link.label}
                        </Link>
                    )
                })}
            </nav>


            <div className="flex gap-3 lg:hidden items-center text-secondary-9">
                <button>
                    <Icon icon="lineicons:search-1" width="24" height="25" className="size-7" />
                    <span className="sr-only">Search</span>
                </button>
                <button>
                    <Icon icon={!showMobileMenu ? "lineicons:menu-hamburger-1" : "codicon:close"} width="25" height="30" className="size-9" />
                    <span className="sr-only">Toggle Menu</span>
                </button>
            </div>


            {
                showMobileMenu &&
                <MobileMenu openMobileMenu={showMobileMenu} setOpenMobileMenu={setShowMobileMenu} />
            }
        </header>
    )
}