import { slides_onlyImages } from "./auth-pages/slides";

export const eventsMock: IEvent[] = [
  {
    image: "/images/demo-images/unsplash_mlVbMbxfWI4.png",
    status: "filling-fast",
    category: "Networking",
    host: "Qavdev",
    title: "Learn to create visually appealing and user friendly interfaces",
    date: "Tomorrow, March 22, 9AM WAT",
    location: "1234, Shima Road, Victoria Island, Lagos",
    price: "₦3,500",
    originalPrice: "₦5,500",
    href: "/ui-workshop",
    attendees: [
      {
        id: 1,
        name: "Ada Daniels",
        profile_img: "/images/demo-images/92572293e79392f138749e26843319d3c61da1ae.png",
        username: "adadaniels"
      },
      {
        id: 2,
        name: "Bola Kareem",
        profile_img: "",
        username: "bolak"
      },
      {
        id: 3,
        name: "Chinedu James",
        profile_img: "",
        username: "cjames"
      }
    ]
  },
  {
    image: "/images/demo-images/unsplash_mlVbMbxfWI4.png",
    status: "sold-out",
    category: "Design",
    host: "UX Lagos",
    title: "Product Design Systems Masterclass",
    date: "Saturday, March 30, 10AM WAT",
    location: "Landmark Centre, Victoria Island, Lagos",
    price: "₦7,000",
    href: "/design-systems",
    attendees: [
      {
        id: 1,
        name: "Funmi Nelson",
        profile_img: "",
        username: "funmin"
      },
      {
        id: 2,
        name: "Grace Okafor",
        profile_img: "/images/demo-images/92572293e79392f138749e26843319d3c61da1ae.png",
        username: "graceo"
      }
    ]
  },
  {
    image: "/images/demo-images/unsplash_mlVbMbxfWI4.png",
    status: "near-capacity",
    category: "Tech Meetup",
    host: "Frontend NG",
    title: "Modern Frontend Architecture Meetup",
    date: "Friday, April 5, 6PM WAT",
    location: "Radisson Blu, Ikeja, Lagos",
    price: "Free",
    href: "/frontend-meetup",
    attendees: [
      {
        id: 1,
        name: "Joshua Smith",
        profile_img: "",
        username: "joshsmith"
      },
      {
        id: 2,
        name: "Kemi Taiwo",
        profile_img: "/images/demo-images/92572293e79392f138749e26843319d3c61da1ae.png",
        username: "kemit"
      }
    ]
  },
  {
    image: "/images/demo-images/unsplash_mlVbMbxfWI4.png",
    status: "near-capacity",
    category: "Tech Meetup",
    host: "Frontend NG",
    title: "Advanced Frontend Architecture Meetup",
    date: "Friday, April 5, 6PM WAT",
    location: "Radisson Blu, Ikeja, Lagos",
    price: "Free",
    href: "/advanced-meetup",
    attendees: [
      {
        id: 1,
        name: "Joshua Smith",
        profile_img: "",
        username: "joshsmith"
      },
      {
        id: 2,
        name: "Kemi Taiwo",
        profile_img: "/images/demo-images/92572293e79392f138749e26843319d3c61da1ae.png",
        username: "kemit"
      }
    ]
  }
]

export const mockAttendees = Array.from(
  new Map(
    eventsMock
      .flatMap(event => event.attendees)
      .map(attendee => [attendee.username, attendee])
  ).values()
).map((attendee, index) => ({
  ...attendee,
  id: index + 1
}))




export const ticketTiers: Partial<TicketTier>[] = [
  { id: '1', name: 'Regular', price: 5000, currency: '₦', description: "Regular access ticket admits one" },
  { id: '2', name: 'VIP', price: 25000, currency: '₦', description: "Regular access ticket admits one" },
  { id: '3', name: 'VVIP', price: 35000, currency: '₦', description: "Regular access ticket admits one" },
  { id: '4', name: 'Front Row', price: 50000, currency: '₦', description: "Regular access ticket admits one" },
  { id: '5', name: 'Early Bird', price: 3500, currency: '₦', description: "Regular access ticket admits one" },
  { id: '6', name: 'Student', price: 4000, currency: '₦', description: "Regular access ticket admits one" },
  { id: '7', name: 'Group', price: 4500, currency: '₦', description: "Regular access ticket admits one" },
  { id: '8', name: 'Platinum', price: 75000, currency: '₦', description: "Regular access ticket admits one" }
]


export const mockAvailableTickets: TicketTier[] = [
  {
      id: '1',
      name: 'Regular',
      price: 0,
      originalPrice: 0,
      currency: '₦',
      description: 'Regular access ticket admits one',
      available: true,
  },
  {
    id: '2',
    name: 'VIP',
    price: 25000,
    originalPrice: 42000,
    currency: '₦',
    description: 'VIP access ticket admits one',
    features: ['Priority seating', 'Backstage access'],
    available: true,
  },
  {
    id: '3',
    name: 'VVIP',
    price: 35000,
    originalPrice: 42000,
    currency: '₦',
    description: 'Front Row access ticket admits one',
    available: true,
    soldOut: true,
  }
]




export const demoHosts: Host[] = [
  {
    id: 99,
    followers: 1240,
    events: 12,
    profile_img: "/images/demo-images/unsplash_vDmf4My-4k0.png",
    name: "Alex Morgan",
    username: "alexmorgan",
  },
  {
    id: 2,
    followers: 980,
    events: 8,
    profile_img: "/images/demo-images/unsplash_vDmf4My-4k0.png",
    name: "Sofia Ramirez",
    username: "sofiar",
  },
  {
    id: 3,
    followers: 2145,
    events: 19,
    profile_img: "/images/demo-images/unsplash_vDmf4My-4k0.png",
    name: "James Carter",
    username: "jamescarter",
  },
  {
    id: 4,
    followers: 765,
    events: 5,
    profile_img: "/images/demo-images/unsplash_vDmf4My-4k0.png",
    name: "Mia Thompson",
    username: "miat",
  },
  {
    id: 5,
    followers: 1890,
    events: 16,
    profile_img: "/images/demo-images/unsplash_vDmf4My-4k0.png",
    name: "Daniel Lee",
    username: "daniellee",
  },
  {
    id: 6,
    followers: 432,
    events: 3,
    profile_img: "/images/demo-images/unsplash_vDmf4My-4k0.png",
    name: "Chloe Bennett",
    username: "chloeb",
  },
];


export const demoFeaturedEvents: FeaturedEvent[] = [
  {
      id: 1,
      image: slides_onlyImages[0],
      title: 'GOGO Event'
  },
  {
      id: 2,
      image: slides_onlyImages[1],
      title: 'Music Festival'
  },
  {
      id: 3,
      image: slides_onlyImages[2],
      title: 'Art Exhibition'
  },
  {
      id: 4,
      image: slides_onlyImages[3],
      title: 'Tech Conference'
  },
  {
      id: 5,
      image: slides_onlyImages[3],
      title: 'Food Festival'
  }
]





export const attendeePricingData: PricingData = {
  plans: [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      currency: '₦',
      perTicketFee: 0,
      description: 'Browse and discover events for free.',
      features: [
        'Browse unlimited events',
        'Create event lists',
        'Follow organizers',
        'Ticket purchasing',
        'Email notifications',
        'Basic profile'
      ],
      buttonText: 'Get started',
      buttonVariant: 'secondary'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 2500,
      currency: '₦',
      perTicketFee: 0,
      description: 'Enhanced experience with exclusive perks.',
      features: [
        'Everything in free plan',
        'Early bird access',
        'Exclusive discounts',
        'Priority customer support',
        'Ad-free experience',
        'Advanced filtering'
      ],
      buttonText: 'Upgrade',
      buttonVariant: 'primary',
      highlighted: true
    }
  ],
  features: [
    { name: 'Browse events', free: true, professional: true, enterprise: true },
    { name: 'Purchase tickets', free: true, professional: true, enterprise: true },
    { name: 'Early bird access', free: false, professional: true, enterprise: true },
    { name: 'Exclusive discounts', free: false, professional: true, enterprise: true },
    { name: 'Priority support', free: false, professional: true, enterprise: true }
  ]
}




export const userTickets: TicketTier[] = [
  { id: '1', name: 'Ticket 1 (Regular)', price: 5000, originalPrice: 5000, currency: '₦', available: true },
  { id: '2', name: 'Ticket 2 (Regular)', price: 5000, originalPrice: 5000, currency: '₦', available: true },
  { id: '3', name: 'Ticket 3 (VIP)', price: 15000, originalPrice: 15000, currency: '₦', available: true },
]




export const mockUserGroups: UserGroup[] = [
    {
        id: 'group-1',
        name: 'Weekend Crew',
        members: [
            { name: 'Tope', email: 'tope@example.com', phone: '+234 801 234 5678' },
            { name: 'Seun', email: 'seun@example.com', phone: '+234 802 345 6789' },
            { name: 'Funke', email: 'funke@example.com', phone: '+234 803 456 7890' }
        ]
    },
    {
        id: 'group-2',
        name: 'Office Friends',
        members: [
            { name: 'Chidi', email: 'chidi@example.com', phone: '+234 804 567 8901' },
            { name: 'Ngozi', email: 'ngozi@example.com', phone: '+234 805 678 9012' }
        ]
    },
    {
        id: 'group-3',
        name: 'Concert Buddies',
        members: [
            { name: 'Ahmed', email: 'ahmed@example.com', phone: '+234 806 789 0123' },
            { name: 'Blessing', email: 'blessing@example.com', phone: '+234 807 890 1234' },
            { name: 'Yemi', email: 'yemi@example.com', phone: '+234 808 901 2345' }
        ]
    }
]
