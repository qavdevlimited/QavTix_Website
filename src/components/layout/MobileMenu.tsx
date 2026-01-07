'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { navLinks } from '@/components-data/navLinks'
import SearchEventInput1 from '../custom-utils/inputs/event-search/SearchEventInput1'


export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const pathname = usePathname()

    const isActive = (href: string) => {
        if (href === '/') return pathname === href
        return pathname.startsWith(href)
    }

    return (
        <>
            <AnimatePresence mode="wait">
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ 
                                x: '-100%',
                                opacity: 0
                            }}
                            animate={{ 
                                x: 0,
                                opacity: 1,
                                transition: {
                                    type: 'spring',
                                    damping: 30,
                                    stiffness: 300,
                                    duration: 0.3
                                }
                            }}
                            exit={{ 
                                x: '-100%',
                                opacity: 0,
                                rotateY: -15,
                                scale: 0.9,
                                transition: {
                                    type: 'spring',
                                    damping: 35,
                                    stiffness: 400,
                                    duration: 0.3
                                }
                            }}
                            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
                            style={{ perspective: '1000px' }}
                        >
                            <div className="p-6 space-y-6">
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ 
                                        y: 0, 
                                        opacity: 1,
                                        transition: { delay: 0.1, duration: 0.3 }
                                    }}
                                    exit={{ 
                                        y: -20, 
                                        opacity: 0,
                                        transition: { duration: 0.15 }
                                    }}
                                >
                                    <SearchEventInput1 />
                                </motion.div>

                                {/* Navigation Links */}
                                <motion.nav 
                                    className="space-y-1"
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                >
                                    {navLinks.map((link, index) => {
                                        const active = isActive(link.href)

                                        return (
                                            <motion.div
                                                key={link.href}
                                                initial={{ 
                                                    x: -30,
                                                    opacity: 0 
                                                }}
                                                animate={{ 
                                                    x: 0,
                                                    opacity: 1,
                                                    transition: {
                                                        delay: 0.15 + (index * 0.04),
                                                        duration: 0.3,
                                                        ease: 'easeOut'
                                                    }
                                                }}
                                                exit={{
                                                    x: -50,
                                                    opacity: 0,
                                                    scale: 0.95,
                                                    transition: {
                                                        delay: (navLinks.length - index - 1) * 0.02,
                                                        duration: 0.2,
                                                        ease: 'easeIn'
                                                    }
                                                }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className={`
                                                        block px-4 py-3 rounded-lg font-normal text-[15px] transition-all
                                                        ${active
                                                            ? 'bg-primary-1 text-primary-7 font-medium'
                                                            : 'text-neutral-8 hover:bg-neutral-2'
                                                        }
                                                        active:scale-[0.98]
                                                    `}
                                                >
                                                    {link.label}
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </motion.nav>

                                {/* Auth Buttons */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ 
                                        y: 0, 
                                        opacity: 1,
                                        transition: { delay: 0.4, duration: 0.3 }
                                    }}
                                    exit={{ 
                                        y: 20, 
                                        opacity: 0,
                                        scale: 0.95,
                                        transition: { duration: 0.15 }
                                    }}
                                    className="pt-4 space-y-3 border-t border-neutral-3"
                                >
                                    <Link
                                        href="/auth/signin"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-6 py-3 rounded-full text-center font-medium text-neutral-8 border-2 border-neutral-3 hover:bg-neutral-2 active:scale-[0.98] transition-all"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        onClick={() => setIsOpen(false)}
                                        className="block px-6 py-3 rounded-full text-center font-medium bg-primary text-white hover:bg-primary-7 active:scale-[0.98] transition-all shadow-md"
                                    >
                                        Get started
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}