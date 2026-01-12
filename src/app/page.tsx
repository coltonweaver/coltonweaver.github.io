import LINKS from '@/links'

export default function Home() {
  return (
    <div className="text-foreground relative mx-auto h-full w-[700px] max-w-full p-8 md:p-16 xl:w-[1400px]">
      <link rel="shortcut icon" type="image/x-icon" sizes="48x48" href="/favicon.ico"></link>
      <div className="mb-12 w-full xl:fixed xl:mb-0 xl:w-[500px]">
        <img
          className="border-border h-28 w-28 rounded-full border-2 xl:h-[184px] xl:w-[184px]"
          src="/pfp.png"
          alt="profile picture"
        />

        <div className="mt-8">
          <h2 className="font-heading text-3xl sm:text-[44px]">Colton Weaver (cbw)</h2>
          <p className="font-base mt-6 text-base sm:text-l">
            My name is Colton Weaver and this is my personal website. I am a Software Engineer living in New York City, working at Stripe.<br /><br />

            My primary specialites are in Distributed Systems, Domain/Data and API Modeling, and Operational Excellence. My role at Stripe is that of a Tech Lead
            in the Organizations and Auth Platform, where I lead a team that is responsible for building and maintaining the "Compartments Graph", which is a service
            responsible for being the source of truth for all account (merchant, customer, recipient, etc.) relationships at Stripe.<br /><br />

            If you'd like to connect, you can reach me via one of the provided links on this page. Thanks for visiting!
          </p>
        </div>
      </div>
      <div className="justify-end xl:flex">
        <div
          id="grid-container"
          className="text-foreground grid w-full grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 xl:w-1/2 xl:pb-16"
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
