interface EventCardUser {
    id: string
    image?: string
    initials: string
}

type Host = {
    id: number, // Havent confirmed Proper Type //
    followers: number,
    events: number,
    profile_img: string,
    name: string,
    username: string
}