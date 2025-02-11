// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Speech Assist',
  description: 'AI-powered speech assistance tool',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="ar" dir="rtl">
        <body className={inter.className}>
          <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
