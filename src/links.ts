import github from '../public/icons/github.svg'
import linkedin from '../public/icons/linkedin.svg'
import hackernews from '../public/icons/hackernews.svg'

type SocialMedia = (typeof websites)[number]

type Link = {
  title: string
  icon: any
  link: string
  text?: string
}

const websites = [
  'github',
  'linkedin',
  'hackernews',
]

const LINKS: { [key in SocialMedia]: Link } = {
  github: {
    title: 'Github',
    icon: github,
    link: 'https://github.com/coltonweaver',
    text: '@coltonweaver',
  },
  linkedin: {
    title: 'Linkedin',
    icon: linkedin,
    link: 'https://www.linkedin.com/in/colton-weaver/',
    text: '@colton-weaver',
  },
  hackernews: {
    title: 'Hacker News',
    icon: hackernews,
    link: 'https://news.ycombinator.com/user?id=coltonweaver',
    text: '@coltonweaver',
  },
}

export default LINKS
