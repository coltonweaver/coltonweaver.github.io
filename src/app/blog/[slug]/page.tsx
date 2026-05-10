import { getAllSlugs, getPost, fmtDate } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { MDXComponents } from 'mdx/types'
import rehypeShikiFromHighlighter from '@shikijs/rehype/core'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import { createHighlighter, type Highlighter } from 'shiki'
import ReadingProgress from '../_components/ReadingProgress'
import MdxImage from '../_components/MdxImage'

let highlighterPromise: Promise<Highlighter> | null = null
function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark'],
      langs: ['python', 'sql', 'rust', 'java', 'ruby', 'go'],
    })
  }
  return highlighterPromise
}

const mdxComponents: MDXComponents = {
  img: (props) => <MdxImage {...props} />,
  MdxImage,
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const highlighter = await getHighlighter()

  return (
    <>
      <ReadingProgress />
      <article className="text-foreground relative mx-auto max-w-[760px] p-8 md:p-16">
        <Link
          href="/blog/"
          className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors mb-8 inline-block"
        >
          ← back to blog
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-foreground/60">
          <span>{fmtDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl mt-3 leading-[1.05]">{post.title}</h1>
        {post.description && (
          <p className="font-base mt-4 text-lg text-foreground/80 leading-relaxed">{post.description}</p>
        )}
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="border-2 border-border bg-secondary-background text-foreground rounded-base px-2 py-0.5 text-xs font-mono"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        <hr className="my-10 border-border border-t-2" />

        <div className="prose-cbw">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  rehypeUnwrapImages,
                  [
                    rehypeShikiFromHighlighter,
                    highlighter,
                    { theme: 'github-dark', fallbackLanguage: 'plaintext' },
                  ],
                ],
              },
            }}
          />
        </div>
      </article>
    </>
  )
}
