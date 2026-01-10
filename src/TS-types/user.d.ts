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
    username: string
}