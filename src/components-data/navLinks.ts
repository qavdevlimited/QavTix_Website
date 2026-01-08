export interface NavLink {
  label: string
  href: string
  type?: 'default' | 'auth' | 'cta'
}

export const NAV_LINKS = {
  ABOUT: {
    label: 'About',
    href: '/about'
  },
  HOW_IT_WORKS: {
    label: 'How it works',
    href: '/how-it-works'
  },
  PRICING: {
    label: 'Pricing',
    href: '/pricing'
  },
  EVENTS: {
    label: 'Events',
    href: '/events'
  },
  SIGN_IN: {
    label: 'Sign in',
    href: '/auth/signin',
    type: 'auth'
  },
  GET_STARTED: {
    label: 'Get started',
    href: '/auth/signup',
    type: 'cta'
  }
} as const satisfies Record<string, NavLink>


export const navLinks: NavLink[] = [
  NAV_LINKS.ABOUT,
  NAV_LINKS.HOW_IT_WORKS,
  NAV_LINKS.PRICING,
  NAV_LINKS.SIGN_IN,
  NAV_LINKS.GET_STARTED
]

export const aboutPageNavLinks: NavLink[] = [
  NAV_LINKS.ABOUT,
  NAV_LINKS.HOW_IT_WORKS,
  NAV_LINKS.PRICING,
  NAV_LINKS.EVENTS,
  NAV_LINKS.SIGN_IN,
  NAV_LINKS.GET_STARTED
]