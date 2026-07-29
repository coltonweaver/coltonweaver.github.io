import type { Metadata } from 'next'
import Splitter from './splitter'

export const metadata: Metadata = {
  title: 'Split',
  description:
    'Split a bill between two or more people in proportion to their incomes. Runs entirely in your browser.',
  alternates: { canonical: '/utilities/split/' },
  openGraph: {
    type: 'website',
    url: 'https://www.coltonweaver.com/utilities/split/',
    title: 'Split · Colton Weaver',
    description:
      'Split a bill between two or more people in proportion to their incomes.',
  },
}

export default function SplitPage() {
  return <Splitter />
}
