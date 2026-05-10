import Link from 'next/link'
import { fmtDate, type PostMeta } from '@/lib/blog'

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="border-border shadow-shadow text-main-foreground rounded-base bg-main hover:translate-x-boxShadowX hover:translate-y-boxShadowY border-2 p-5 transition-all hover:shadow-none block"
    >
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-main-foreground/70">
        <span>{fmtDate(post.date)}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>
      <p className="font-heading mt-3 text-lg sm:text-xl leading-tight">{post.title}</p>
      <p className="font-base mt-2 text-sm sm:text-base">{post.description}</p>
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span
              key={t}
              className="border-2 border-border bg-secondary-background text-foreground rounded-base px-1.5 py-0.5 text-xs font-mono"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
