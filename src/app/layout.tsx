import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, EB_Garamond } from 'next/font/google';
import localFont from 'next/font/local';
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
  variable: '--font-eb-garamond',
  display: 'swap',
});

const jawaPalsu = localFont({
  src: './fonts/JawaPalsu.ttf',
  variable: '--font-jawapalsu',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Rima & Adli — The Wedding | Anchored Realm',
  description:
    'You are warmly invited to witness the sacred union of Rima & Adli on January 16, 2027. A celebration rooted in Javanese tradition and timeless love — Anchored Realm.',
  keywords: ['Rima Adli wedding', 'undangan digital', 'Anchored Realm', 'Javanese wedding', 'January 2027'],
  openGraph: {
    title: 'Rima & Adli — The Wedding',
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
      className={`grain ${cinzel.variable} ${cormorant.variable} ${ebGaramond.variable} ${jawaPalsu.variable}`}
    >
      <body className={`antialiased ${jawaPalsu.variable}`}>{children}</body>
    </html>
  );
}
