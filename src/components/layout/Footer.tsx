'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import Logo from './Logo'
import { space_grotesk } from '@/lib/redux/fonts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { footerData } from '@/components-data/footer-data'

interface FooterLink {
  label: string
  href: string
}




export default function Footer() {
    const [selectedCurrency, setSelectedCurrency] = useState('NG')
    const [selectedRegion, setSelectedRegion] = useState('Naira')


    // Featuring Only Nigeria Region
    const currencies = [
        { code: 'NG', label: 'NG', flag: '🇳🇬' },
        // { code: 'US', label: 'US', flag: '🇺🇸' },
        // { code: 'GB', label: 'GB', flag: '🇬🇧' },
    ]

    const regions = [
        { code: 'Naira', label: 'Naira', symbol: '₦' },
        // { code: 'Dollar', label: 'Dollar', symbol: '$' },
        // { code: 'Pound', label: 'Pound', symbol: '£' },
    ]

    return (
        <footer className="w-full relative bg-primary-1 px-6 lg:px-16 py-12">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="w-[90%] md:w-1/2 h-full absolute bg-contain bg-no-repeat bg-[url('/images/vectors/logo-bg-element-mobile.svg')] left-0 top-0 bottom-0 mx-auto"></div>
                <div className="grid relative z-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div>
                        <Logo />
                    </div>

                    {/* QavTix Links */}
                    <div>
                        <h3 className="text-neutral-7 font-medium mb-4">
                            {footerData.sections[0].title}
                        </h3>
                        <ul className="space-y-3">
                        {footerData.sections[0].links.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="text-neutral-8 text-sm font-medium hover:text-primary-6 transition-colors inline-block relative group"
                                >
                                    {link.label}
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-6 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </li>
                        ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-neutral-7 font-medium mb-4">
                            {footerData.sections[1].title}
                        </h3>
                        <ul className="space-y-3">
                        {footerData.sections[1].links.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    className="text-neutral-8 text-sm font-medium hover:text-primary-6 transition-colors inline-block relative group"
                                >
                                    {link.label}
                                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-6 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                            </li>
                        ))}
                        </ul>
                    </div>

                    {/* Get in Touch */}
                    <div>
                        <h3 className="text-neutral-7 font-medium mb-4">
                        {footerData.contact.title}
                        </h3>
                        <ul className="space-y-3">
                        {footerData.contact.info.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <Icon icon={item.icon} width="20" height="20" className="text-neutral-7 mt-0.5 shrink-0" />
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="text-neutral-8 text-sm font-medium hover:text-primary-6 transition-colors"
                                    >
                                        {item.text}
                                    </Link>
                                ) : (
                                    <span className="text-neutral-8 text-sm font-medium">{item.text}</span>
                                )}
                            </li>
                        ))}
                        </ul>

                        {/* Social Links */}
                        <div className="hidden md:flex gap-4 mt-6">
                            {footerData.social.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center hover:scale-110 transition-transform"
                                    aria-label={social.label}
                                >
                                    <Icon icon={social.icon} width="24" height="24" className='text-primary-6 size-9' />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex gap-4 mt-6 justify-center md:hidden">
                    {footerData.social.map((social) => (
                        <Link
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center hover:scale-110 transition-transform"
                            aria-label={social.label}
                        >
                            <Icon icon={social.icon} width="24" height="24" className='text-primary-6 size-9' />
                        </Link>
                    ))}
                </div>
                <div className="pt-8 border-t border-neutral-3 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className={`${space_grotesk.className} text-neutral-8 order-2 md:order-[unset]`}>
                        © 2025 QavTix
                    </p>

                    {/* Legal Links */}
                    <div className="flex relative order-1 md:order-[unset] z-10 items-center gap-1 text-sm font-medium">
                        {footerData.legal.map((link, index) => (
                        <span key={link.label} className="flex items-center gap-1">
                            <Link
                                href={link.href}
                                className="text-neutral-8 font-bold hover:text-primary-6 transition-colors"
                            >
                            {link.label}
                            </Link>
                            {index < footerData.legal.length - 1 && (
                                <span className="text-neutral-7 mx-2">•</span>
                            )}
                        </span>
                        ))}
                    </div>

                    <div className="flex relative z-10 items-center gap-3 order-3 md:order-[unset]">
                        {/* Currency Selector */}
                        <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                            <SelectTrigger className="w-28 bg-white rounded-lg border-neutral-3 hover:border-neutral-4 focus:border-primary-6">
                                <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                                {currencies.map((currency) => (
                                    <SelectItem key={currency.code} value={currency.code}>
                                        <span className="flex items-center gap-2">
                                            <span className='text-2xl'>{currency.flag}</span>
                                            <span>{currency.label}</span>
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Region Selector */}
                        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                            <SelectTrigger className="w-28 bg-white rounded-lg border-neutral-3 hover:border-neutral-4 focus:border-primary-6">
                                <SelectValue placeholder="Select region" />
                            </SelectTrigger>
                            <SelectContent>
                                {regions.map((region) => (
                                    <SelectItem key={region.code} value={region.code}>
                                        <span className="flex items-center gap-2">
                                            <span>{region.symbol}</span>
                                            <span>{region.label}</span>
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </footer>
    )
}