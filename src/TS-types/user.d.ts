type AuthUser = {
    tickets: TicketTier[],
    profile_img: string,
    full_name: string,
    id: string
}

interface EventCardUser {
    id: string
    image?: string
    initials: string
}

 // Havent confirmed Proper Type //

type Host = {
    id: number,
    followers: number,
    events: number,
    profile_img: string,
    name: string,
    username: string
}

type Attendee = {
    id: number,
    name: string,
    profile_img: string,
    username: string,
    socials?: {
        href: string,
        text: string,
        icon: string
    }[]
}