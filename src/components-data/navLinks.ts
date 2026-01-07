interface NavLink {
    label: string
    href: string
    type?: 'default' | 'auth' | 'cta'
}

export const navLinks: NavLink[] = [
    { label: 'About', href: '/about' },
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Sign in', href: '/auth/signin' },
    { label: 'Get started', href: '/auth/signup', type: 'cta' }
]