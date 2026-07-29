// Registry for the /utilities section. Adding a utility means adding an entry
// here plus a route under src/app/utilities/<slug>/ — the landing page and the
// sitemap both read from this list.

export type Utility = {
  slug: string
  title: string
  description: string
}

const UTILITIES: Utility[] = [
  {
    slug: 'split',
    title: 'Split',
    description:
      'Split a bill between two or more people in proportion to their incomes.',
  },
]

export default UTILITIES
