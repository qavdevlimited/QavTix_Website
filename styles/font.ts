import { Inter, Space_Grotesk } from 'next/font/google';

const INTER = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

const SpaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const INTER_CLASS = INTER.className;
export const SPACE_GROTESK_CLASS = SpaceGrotesk.className;
