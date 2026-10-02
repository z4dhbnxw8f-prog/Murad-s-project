import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Shell } from '@/components/platform';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Ankommen — Let’s talk about Germany.',
    template: '%s | Ankommen',
  },
  description:
    'Explore professional support for your move to Germany, from work and study to family and everyday life.',
  openGraph: {
    title: 'Ankommen — Let’s talk about Germany.',
    description:
      'Questions about moving to Germany? Tell us what you have in mind.',
    type: 'website',
  },
};

// Apply the saved theme before paint to avoid flashing the wrong palette.
const themeScript = `
  try {
    document.documentElement.dataset.theme =
      localStorage.getItem('ankommen-theme') === 'light' ? 'light' : 'dark';
  } catch {
    document.documentElement.dataset.theme = 'dark';
  }
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
