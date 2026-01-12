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
          <h2 className="font-heading text-3xl sm:text-[44px]">Colton Weaver (cbw)</h2>
          <p className="font-base mt-6 text-base sm:text-l">
            I am a Software Engineer based in New York City, currently employed at Stripe.<br /><br />

            My areas of expertise include Distributed Systems, Domain/Data and API Modeling, and Operational Excellence. I serve as a Tech Lead on the Organizations and Auth Platform team, where I oversee the development and maintenance of the Compartments Graph—the authoritative source for all account relationships (merchants, customers, recipients, and related entities) at Stripe.<br /><br />

            Should you wish to connect, please feel free to reach out via any of the links provided on this page.
          </p>
        </div>
      </div>
      <div className="justify-end xl:flex">
        <div
          id="grid-container"
          className="text-foreground grid w-full grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-8 xl:w-1/2 xl:pb-16"
        >
          {Object.keys(LINKS).map((key) => (
            <a
              className="border-border shadow-shadow text-main-foreground rounded-base bg-main hover:translate-x-boxShadowX hover:translate-y-boxShadowY border-2 p-5 transition-all hover:shadow-none"
              key={key}
              target="_blank"
              rel="noopener noreferrer"
              href={LINKS[key].link}
            >
              <img
                className="h-8 w-8 sm:h-10 sm:w-10"
                src={LINKS[key].icon.src}
                alt={LINKS[key].title}
              />
              <p className="font-heading mt-3 text-lg sm:text-xl">
                {LINKS[key].title}
              </p>
              <p className="font-base mt-1 text-sm sm:text-base">
                {LINKS[key].text}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
