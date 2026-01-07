'use client'

import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useState } from 'react'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  name: string
  icon: string
  href: string
  color: string
}

interface ContactInfo {
  icon: string
  text: string
  href?: string
}

const footerData = {
  sections: [
    {
      title: 'QavTix',
      links: [
        { label: 'About us', href: '/about' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'How it works', href: '/how-it-works' },
        { label: 'Explore event', href: '/events' },
        { label: 'Sell ticket', href: '/sell-tickets' },
        { label: 'Create event', href: '/create-event' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', href: '/faq' },
        { label: 'Help', href: '/help' },
        { label: 'Contact', href: '/contact' },
      ]
    }
  ],
  contact: {
    title: 'Get in touch',
    info: [
      { icon: 'mdi:map-marker', text: 'Lagos, Nigeria.', href: null },
      { icon: 'mdi:email-outline', text: 'info@qavtix.com', href: 'mailto:info@qavtix.com' },
      { icon: 'mdi:phone-outline', text: '+234 812 345 6789', href: 'tel:+2348123456789' },
    ]
  },
  social: [
    { name: 'Facebook', icon: 'mdi:facebook', href: 'https://facebook.com', color: '#1877F2' },
    { name: 'Twitter', icon: 'ri:twitter-x-fill', href: 'https://twitter.com', color: '#000000' },
    { name: 'Instagram', icon: 'mdi:instagram', href: 'https://instagram.com', color: '#E4405F' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Use', href: '/terms-of-use' },
  ]
}

export default function Footer() {
  const [selectedCurrency, setSelectedCurrency] = useState('US')
  const [selectedRegion, setSelectedRegion] = useState('Naira')

  const currencies = [
    { code: 'US', label: 'US', flag: '🇺🇸' },
    { code: 'NG', label: 'NG', flag: '🇳🇬' },
    { code: 'GB', label: 'GB', flag: '🇬🇧' },
  ]

  const regions = [
    { code: 'Naira', label: 'Naira', symbol: '₦' },
    { code: 'Dollar', label: 'Dollar', symbol: '$' },
    { code: 'Pound', label: 'Pound', symbol: '£' },
  ]

  return (
    <footer className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 px-6 lg:px-16 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-block group">
              <h2 className="text-3xl font-bold text-primary-6 group-hover:text-primary-7 transition-colors">
                QavTix
              </h2>
            </Link>
          </div>

          {/* QavTix Links */}
          <div>
            <h3 className="text-neutral-8 font-semibold mb-4">
              {footerData.sections[0].title}
            </h3>
            <ul className="space-y-3">
              {footerData.sections[0].links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-7 hover:text-primary-6 transition-colors inline-block relative group"
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
            <h3 className="text-neutral-8 font-semibold mb-4">
              {footerData.sections[1].title}
            </h3>
            <ul className="space-y-3">
              {footerData.sections[1].links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-neutral-7 hover:text-primary-6 transition-colors inline-block relative group"
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
            <h3 className="text-neutral-8 font-semibold mb-4">
              {footerData.contact.title}
            </h3>
            <ul className="space-y-3">
              {footerData.contact.info.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Icon icon={item.icon} width="20" height="20" className="text-neutral-6 mt-0.5 shrink-0" />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-neutral-7 hover:text-primary-6 transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-neutral-7">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {footerData.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm hover:shadow-md"
                  aria-label={social.name}
                  style={{ color: social.color }}
                >
                  <Icon icon={social.icon} width="24" height="24" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-neutral-3 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-neutral-6 text-sm">
            © 2025 QavTix
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-1 text-sm">
            {footerData.legal.map((link, index) => (
              <span key={link.label} className="flex items-center gap-1">
                <Link
                  href={link.href}
                  className="text-neutral-7 font-medium hover:text-primary-6 transition-colors"
                >
                  {link.label}
                </Link>
                {index < footerData.legal.length - 1 && (
                  <span className="text-neutral-5 mx-2">•</span>
                )}
              </span>
            ))}
          </div>

          {/* Currency and Region Selectors */}
          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="appearance-none bg-white border border-neutral-3 rounded-lg px-3 py-2 pr-8 text-sm text-neutral-8 hover:border-neutral-4 focus:outline-none focus:border-primary-6 transition-colors cursor-pointer"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.label}
                  </option>
                ))}
              </select>
              <Icon
                icon="mdi:chevron-down"
                width="20"
                height="20"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-6 pointer-events-none"
              />
            </div>

            {/* Region Selector */}
            <div className="relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="appearance-none bg-white border border-neutral-3 rounded-lg px-3 py-2 pr-8 text-sm text-neutral-8 hover:border-neutral-4 focus:outline-none focus:border-primary-6 transition-colors cursor-pointer"
              >
                {regions.map((region) => (
                  <option key={region.code} value={region.code}>
                    {region.symbol} {region.label}
                  </option>
                ))}
              </select>
              <Icon
                icon="mdi:chevron-down"
                width="20"
                height="20"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-6 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}