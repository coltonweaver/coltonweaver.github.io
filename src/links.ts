import github from '../public/icons/github.svg'
import linkedin from '../public/icons/linkedin.svg'
import hackernews from '../public/icons/hackernews.svg'
import bluesky from '../public/icons/bluesky.svg'
import x from '../public/icons/x.svg'
import resume from '../public/icons/resume.svg'
import utilities from '../public/icons/utilities.svg'

type SocialMedia = (typeof websites)[number]

type Link = {
  title: string
  icon: { src: string }
  link: string
  text?: string
  /** Same-tab navigation for pages on this site; others open a new tab. */
  internal?: boolean
}

const websites = [
  'utilities',
  'github',
  'linkedin',
  'hackernews',
  'bluesky',
  'x',
  'resume',
]

const LINKS: { [key in SocialMedia]: Link } = {
  utilities: {
    title: 'Utilities',
    icon: utilities,
    link: '/utilities/',
    text: 'Small tools I built',
    internal: true,
  },
  linkedin: {
    title: 'Linkedin',
    icon: linkedin,
    link: 'https://www.linkedin.com/in/colton-weaver/',
    text: '@colton-weaver',
  },
  github: {
    title: 'Github',
    icon: github,
    link: 'https://github.com/coltonweaver',
    text: '@coltonweaver',
  },
  hackernews: {
    title: 'Hacker News',
    icon: hackernews,
    link: 'https://news.ycombinator.com/user?id=coltonweaver',
    text: '@coltonweaver',
  },
  bluesky: {
    title: 'Bluesky',
    icon: bluesky,
    link: 'https://bsky.app/profile/coltonweaver.bsky.social',
    text: '@coltonweaver',
  },
  x: {
    title: 'X',
    icon: x,
    link: 'https://x.com/coltonbweaver',
    text: '@coltonbweaver',
  },
  resume: {
    // Built from LaTeX source in coltonweaver/resume and pulled from that
    // repo's `latest` release at build time (see scripts/fetch-resume.mjs).
    // Served from this domain so browsers render it inline rather than
    // downloading it, which is what GitHub's release headers force.
    title: 'Resume',
    icon: resume,
    link: '/docs/cbw_resume.pdf',
    text: 'Resume PDF',
  },
}

export default LINKS
