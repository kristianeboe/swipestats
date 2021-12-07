export function CTASection() {
  return (
    <div className="relative mt-12 sm:mt-18 sm:py-16">
      <div aria-hidden="true" className="hidden sm:block">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl" />
        <svg
          className="absolute top-8 left-1/2 -ml-3"
          width={404}
          height={392}
          fill="none"
          viewBox="0 0 404 392"
        >
          <defs>
            <pattern
              id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
        </svg>
      </div>
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative rounded-2xl px-6 py-10 bg-rose-500 overflow-hidden shadow-xl sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
            <svg
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 1463 360"
            >
              <path
                className="text-rose-400 text-opacity-40"
                fill="currentColor"
                d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
              />
              <path
                className="text-rose-600 text-opacity-40"
                fill="currentColor"
                d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
              />
            </svg>
          </div>
          <div className="relative">
            <div className="sm:text-center">
              <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                Afraid you&rsquo;ll forget about Swipestats?
              </h2>
              <p className="mt-6 mx-auto max-w-2xl text-lg text-rose-100">
                This email will not be affiliated with your Tinder data in any way
              </p>
            </div>
            <form
              id="mc-embedded-subscribe-form"
              action="https://swipestats.us13.list-manage.com/subscribe/post?u=2f100a8bbcda9a834b7ab997b&amp;id=90dddf015e"
              className="mt-12 sm:mx-auto sm:max-w-lg sm:flex validate"
              method="post"
              name="mc-embedded-subscribe-form"
              target="_blank"
              noValidate
            >
              <div className="min-w-0 flex-1">
                <label htmlFor="cta-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="cta-email"
                  type="email"
                  className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-3">
                <button
                  type="submit"
                  className="block w-full rounded-md border border-transparent px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-500 sm:px-10"
                >
                  Remind me in 3 days
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
