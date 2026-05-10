/* eslint-disable @next/next/no-img-element */
type Props = {
  src?: string
  alt?: string
  caption?: string
  width?: number | string
  height?: number | string
}

export default function MdxImage({ src, alt = '', caption, width, height }: Props) {
  if (!src) return null
  return (
    <figure className="my-8 border-2 border-border rounded-base overflow-hidden bg-secondary-background shadow-shadow">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="w-full h-auto block"
      />
      {(caption || alt) && (
        <figcaption className="font-mono text-xs text-foreground/60 text-center p-2 border-t-2 border-border bg-secondary-background">
          {caption ?? alt}
        </figcaption>
      )}
    </figure>
  )
}
