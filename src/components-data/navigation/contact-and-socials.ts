export const SOCIAL_LINKS = {
  FACEBOOK: {
    label: "Facebook",
    href: "https://facebook.com/qavtix",
    icon: "mdi:facebook"
  },
  TWITTER: {
    label: "Twitter",
    href: "https://twitter.com/qavtix",
    icon: "streamline-logos:x-twitter-logo-solid"
  },
  INSTAGRAM: {
    label: "Instagram",
    href: "https://instagram.com/qavtix",
    icon: "mdi:instagram"
  },
} as const



export const CONTACT_LINKS = {
  LOCATION: {
    icon: "hugeicons:location-06",
    text: "Lagos, Nigeria.",
    href: null
  },
  EMAIL: {
    icon: "mynaui:mail",
    text: "info@qavtix.com",
    href: "mailto:info@qavtix.com"
  },
  PHONE: {
    icon: "fluent-mdl2:phone",
    text: "+234 812 345 6789",
    href: "tel:+2348123456789"
  }
} as const


export const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" }
] as const;

export const SUPPORT_LINKS = [
  { label: "FAQ", href: "/faq" },
  { label: "Help", href: "/help" },
  { label: "Contact", href: "/contact" }
] as const;
