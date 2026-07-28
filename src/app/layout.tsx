import type { Metadata } from 'next'
import { JetBrains_Mono, Work_Sans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './theme-provider'

const workSans = Work_Sans({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const SITE_URL = 'https://www.coltonweaver.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Colton Weaver',
    template: '%s · Colton Weaver',
  },
  description:
    'Colton Weaver — Member of Technical Staff at Anthropic. Distributed systems, API design, and platform reliability.',
  icons: { icon: '/favicon.ico' },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Colton Weaver',
    url: SITE_URL,
    title: 'Colton Weaver',
    description:
      'Member of Technical Staff at Anthropic. Distributed systems, API design, and platform reliability.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Colton Weaver',
    description:
      'Member of Technical Staff at Anthropic. Distributed systems, API design, and platform reliability.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${workSans.className} ${jetbrainsMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
