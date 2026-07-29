import type { Metadata } from 'next'
import UTILITIES from '@/utilities'

export const metadata: Metadata = {
  title: 'Utilities',
  description: 'Small tools I built for myself, free to use and ad-free.',
  alternates: { canonical: '/utilities/' },
  openGraph: {
    type: 'website',
    url: 'https://www.coltonweaver.com/utilities/',
    title: 'Utilities · Colton Weaver',
    description: 'Small tools I built for myself, free to use and ad-free.',
  },
}

export default function UtilitiesPage() {
  return (
    <div className="text-foreground mx-auto w-[700px] max-w-full p-6 sm:p-8 md:p-16">
      <a
        href="/"
        className="font-base text-foreground/70 hover:text-foreground text-sm underline"
      >
        ← coltonweaver.com
      </a>

      <h1 className="font-heading mt-6 text-3xl sm:text-[44px]">Utilities</h1>
      <p className="font-base text-foreground/70 mt-2 text-base">
        Small tools I built for myself. No ads, no tracking, and they run
        entirely in your browser.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {UTILITIES.map((utility) => (
          <a
            key={utility.slug}
            href={`/utilities/${utility.slug}/`}
            className="border-border shadow-shadow text-main-foreground rounded-base bg-main hover:translate-x-boxShadowX hover:translate-y-boxShadowY border-2 p-5 transition-all hover:shadow-none"
          >
            <p className="font-heading text-lg sm:text-xl">{utility.title}</p>
            <p className="font-base mt-1 text-sm sm:text-base">
              {utility.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}
