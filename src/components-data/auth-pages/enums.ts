// Using Const Obj as enums to reduce bundle size

export const AccountTypes = {
    ATTENDEE: "attendee",
    HOST: "host"
} as const

export const HostAccountTypes = {
    INDIVIDUAL: "individual",
    ORGANIZATION: "organization"
} as const