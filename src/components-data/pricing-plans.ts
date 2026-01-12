export const hostPricingData: PricingData = {
  plans: [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      currency: '₦',
      perTicketFee: 5,
      description: 'The essentials to get started with no monthly fee.',
      features: [
        'Unlimited events listing',
        'Unlimited ticket sales',
        'QR code tickets',
        'Ticket transfers',
        'Standard analytics and reports',
        'Email support (24-48 hrs)'
      ],
      buttonText: 'Get started',
      buttonVariant: 'secondary'
    },
    {
      id: 'professional',
      name: 'Professional Plan',
      price: 10500,
      currency: '₦',
      perTicketFee: 2,
      description: 'Best for growing events and teams seeking more flexibility. First 30 days FREE, cancel anytime.',
      features: [
        'Everything in free plan',
        'Email support (12 hrs)',
        'Advanced analytics and reports',
        'Custom event branding',
        'Promo codes & discount tools',
        'Email marketing tools',
        'Multi-user team access',
        'API access for integrations'
      ],
      buttonText: 'Upgrade',
      buttonVariant: 'primary',
      highlighted: true,
      trial: 'First 30 days FREE'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Plan',
      price: 0,
      currency: 'Custom',
      perTicketFee: 1,
      description: 'For large-scale events and organizations needing full customization.',
      features: [
        'Everything in the professional plan',
        'Dedicated account manager',
        'White-label platform options',
        'Custom integrations',
        'Bulk event upload tools',
        'Priority technical support',
        'SLA (Service Level Agreement)',
        'Custom payment terms',
        'Advanced security options'
      ],
      buttonText: 'Contact us',
      buttonVariant: 'secondary'
    }
  ],
  features: [
    { name: 'Unlimited events', free: true, professional: true, enterprise: true },
    { name: 'Ticket fee (per ticket)', free: '5%', professional: '5%', enterprise: '5%' },
    { name: 'Custom branding', free: false, professional: true, enterprise: true },
    { name: 'Advanced analytics', free: false, professional: true, enterprise: true },
    { name: 'Discount codes', free: false, professional: true, enterprise: true },
    { name: 'Priority support', free: false, professional: true, enterprise: true },
    { name: 'Dedicated manager & SSO', free: false, professional: false, enterprise: true }
  ]
}