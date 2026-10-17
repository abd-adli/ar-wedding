import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="id" className="grain">
      <body className="antialiased">{children}</body>
    </html>
  );
}
