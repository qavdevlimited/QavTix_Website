const highlightedPlatforms = ['facebook', 'linkedin', 'telegram']

export const isHighlightedSocial = (value: string) =>
  highlightedPlatforms.some(platform =>
    value.toLowerCase().includes(platform)
)