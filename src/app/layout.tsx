import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, EB_Garamond, Great_Vibes } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
 
  variable: '--font-cormorant',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
 
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Adli & Rima — The Wedding | Anchored Realm',
  description:
    'You are warmly invited to witness the sacred union of Adli & Rima on January 16, 2027. A celebration rooted in Javanese tradition and timeless love — Anchored Realm.',
  keywords: ['Adli Rima wedding', 'undangan digital', 'Anchored Realm', 'Javanese wedding', 'January 2027'],
  openGraph: {
    title: 'Adli & Rima — The Wedding',
    description: 'Join us as we celebrate our union on January 16, 2027.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`grain ${cinzel.variable} ${cormorant.variable} ${ebGaramond.variable} ${greatVibes.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
