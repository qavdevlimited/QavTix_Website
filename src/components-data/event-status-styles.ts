export type StatusStylesRecord = Record<
  IEventStatus,
  { bg: string; text: string; label: string }
>

export const statusStyles : StatusStylesRecord  = {
  "filling-fast": {
    bg: "bg-warning-tertiary",
    text: "text-secondary-9",
    label: "Filling fast",
  },
  "near-capacity": {
    bg: "bg-danger-tertiary",
    text: "text-secondary-9",
    label: "Near capacity",
  },
  new: {
    bg: "bg-positive-tertiary",
    text: "text-secondary-9",
    label: "New",
  },
  "sold-out": {
    bg: "bg-white",
    text: "text-red-600",
    label: "Sold out",
  },
}