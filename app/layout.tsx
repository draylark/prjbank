export const dynamic = 'force-dynamic';

import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const ibmPlexSerefi = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
  title: "PrJBank",
  description: "PrJBank is a modern banking platform for everyone.",
  icons: {
    icon: './icons/logo.svg'
  },
  openGraph: {
    type: 'website',
    url: 'https://prjbank.vercel.app',
    title: 'PrJBank',
    description: 'PrJBank is a modern banking platform for everyone.',
    images: [
      {
        url: './icons/logo.svg',
        width: 800,
        height: 600,
        alt: 'PrJBank Logo',
      },
    ],
  }
};

export default  function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerefi.variable}`}>
        {children}
      </body>
    </html>
  );
}
