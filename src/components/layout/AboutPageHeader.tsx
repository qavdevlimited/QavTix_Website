'use client'

import { usePathname } from "next/navigation"
import Logo from "./Logo"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { aboutPageNavLinks } from "@/components-data/navLinks"
import { useState } from "react"
import MobileMenu from "./MobileMenu"
import logoSrc from "@/public-assets/logo/qavtix-logo-white.svg"

export default function AboutPageHeader() {
    const pathName = usePathname()
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    const isActive = (href: string) => {
        if (href === '/') return pathName === href
        return pathName.startsWith(href)
    }

    const mainNavLinks = aboutPageNavLinks.filter(link => link.type !== 'cta' && link.type !== "auth")
    const ctaLinks = aboutPageNavLinks.filter(link => link.type === 'cta')

    return (
        !pathName.startsWith("/auth") && pathName === "/about-us" && (
            <header className="py-8 w-full absolute top-0 left-0 z-100">
                <div className="global-px flex items-center justify-between">
                    <Logo logo={pathName.includes("about-us") ? logoSrc : undefined} />

                    <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {mainNavLinks.map((link) => {
                            const active = isActive(link.href)
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`
                                        px-4 py-2 rounded-lg text-sm transition-all duration-150
                                        ${active
                                            ? 'text-white font-semibold'
                                            : 'text-neutral-6 font-medium hover:text-neutral-5'
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

                    <div className="flex items-center gap-6">
                        {/* <SearchEventInput1 className="hidden xl:block" /> */}

                        <div className="hidden lg:flex items-center gap-3">
                            {
                                aboutPageNavLinks.map((v) => {
                                    const active = isActive(v.href)
                                    return (
                                        v.type === "auth" ?
                                        <Link
                                            key={v.href}
                                            href={v.href}
                                            className={`
                                                px-4 py-2 rounded-lg text-sm transition-all duration-150 text-neutral-8 font-medium hover:text-neutral-7 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-neutral-4 focus:ring-offset-2
                                            `}
                                        >
                                            {v.label}
                                        </Link>
                                        :
                                        null
                                    ) 
                                })
                            }
                            {ctaLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-6 py-4 rounded-full bg-primary text-white font-medium text-sm hover:bg-primary-7 hover:shadow-md active:bg-primary-8 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-150"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex gap-3 lg:hidden items-center text-secondary-9">
                            <button aria-label="Search">
                                <Icon icon="lineicons:search-1" width="24" height="25" className="size-7" />
                            </button>
                            <button
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                                aria-label="Toggle menu"
                            >
                                <Icon
                                    icon={showMobileMenu ? "codicon:close" : "lineicons:menu-hamburger-1"}
                                    width="30"
                                    height="30"
                                    className="size-9"
                                />
                            </button>
                        </div>
                    </div>
                </div>

                {
                    showMobileMenu &&
                    <MobileMenu openMobileMenu={showMobileMenu} setOpenMobileMenu={setShowMobileMenu} />
                }
            </header>
        )
    )
}