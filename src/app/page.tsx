import LINKS from '@/links'

export default function Home() {
  return (
    <div className="text-foreground relative mx-auto h-full w-[700px] max-w-full p-8 md:p-16 lg:w-[900px] xl:w-[1400px]">
      <div className="mb-12 w-full xl:fixed xl:mb-0 xl:w-[500px]">
        <img
          className="border-border h-28 w-28 rounded-full border-2 lg:h-36 lg:w-36 xl:h-[184px] xl:w-[184px]"
          src="/pfp.png"
          alt="profile picture"
        />

        <div className="mt-8">
          <h2 className="font-heading text-3xl sm:text-[44px]">Colton Weaver</h2>
          <p className="font-heading mt-2 text-lg sm:text-xl text-foreground/70">
            Member of Technical Staff
          </p>
          <p className="font-base mt-4 text-base sm:text-l">
            I build the systems that other systems depend on—distributed infrastructure, API design, and the kind of platform reliability you only notice when it's missing. I'm currently at Anthropic, working on the Memory and Search Infrastructure behind Claude. Before that I spent four years at Stripe leading the Compartments and Accounts Platform team, where I owned the Compartments Graph—the authoritative source for every account relationship at Stripe—and helped take Organizations from zero users to over 100,000.
          </p>
        </div>
      </div>
      <div className="justify-end xl:flex">
        <div
          id="grid-container"
          className="text-foreground grid w-full grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-8 xl:w-1/2 xl:pb-16"
        >
          {Object.keys(LINKS).map((key) => {
            const L = LINKS[key]
            const className =
              'border-border shadow-shadow text-main-foreground rounded-base bg-main hover:translate-x-boxShadowX hover:translate-y-boxShadowY border-2 p-5 transition-all hover:shadow-none'
            const inner = (
              <>
                <img
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  src={L.icon.src}
                  alt={L.title}
                />
                <p className="font-heading mt-3 text-lg sm:text-xl">{L.title}</p>
                <p className="font-base mt-1 text-sm sm:text-base">{L.text}</p>
              </>
            )
            return (
              <a
                key={key}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
                href={L.link}
              >
                {inner}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
