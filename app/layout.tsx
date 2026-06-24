import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Recipe Manager | Your Cooking Companion',
  description: 'Discover, save, and manage your favorite recipes with our modern recipe manager',
  themeColor: '#0f172a',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'Recipe Manager | Discover Delicious Recipes',
    description: 'Find, save, and organize your favorite recipes in one beautiful app.',
    url: 'https://your-site.example',
    siteName: 'Recipe Manager',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Recipe Manager — Discover Delicious Recipes',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recipe Manager',
    description: 'A modern recipe manager built with Next.js and TailwindCSS',
    images: ['/og-image.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
