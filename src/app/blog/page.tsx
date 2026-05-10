import { getAllPostMeta } from '@/lib/blog'
import Link from 'next/link'
import PostCard from './_components/PostCard'

export const metadata = {
  title: 'Blog',
}

export default function BlogIndexPage() {
  const posts = getAllPostMeta()
  return (
    <div className="text-foreground relative mx-auto h-full w-[700px] max-w-full p-8 md:p-16 lg:w-[900px] xl:w-[1400px]">
      <div className="mb-10">
        <Link
          href="/"
          className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors mb-3 inline-block"
        >
          ← back to home
        </Link>
        <h1 className="font-heading text-4xl sm:text-5xl">Blog</h1>
        <p className="font-base mt-2 text-foreground/70">
          A mix of technical writing and professional notes — distributed systems,
          platform engineering, and the craft of building software.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-8">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="font-mono text-sm text-foreground/60">
          No posts yet. Drop an .mdx file into <code>src/content/blog/</code>.
        </p>
      )}
    </div>
  )
}
