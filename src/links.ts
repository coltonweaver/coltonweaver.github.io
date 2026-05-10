import github from '../public/icons/github.svg'
import linkedin from '../public/icons/linkedin.svg'
import hackernews from '../public/icons/hackernews.svg'
import bluesky from '../public/icons/bluesky.svg'
import resume from '../public/icons/resume.svg'
import blog from '../public/icons/blog.svg'

type SocialMedia = (typeof websites)[number]

type Link = {
  title: string
  icon: { src: string }
  link: string
  text?: string
  internal?: boolean
}

const websites = [
  'github',
  'linkedin',
  'hackernews',
  'bluesky',
  'resume',
  'blog',
]

const LINKS: { [key in SocialMedia]: Link } = {
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
  resume: {
    title: 'Resume',
    icon: resume,
    link: './docs/cbw_resume.pdf',
    text: 'Resume PDF',
  },
  blog: {
    title: 'Blog',
    icon: blog,
    link: '/blog/',
    text: 'Writing',
    internal: true,
  },
}

export default LINKS
