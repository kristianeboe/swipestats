import Link from 'next/link';
import Image from 'next/image';

export default function Custom404() {
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
      <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <Link href="/" passHref>
              <a className="inline-flex">
                <span className="sr-only">Swipestats</span>
                <Image
                  className="h-24 w-auto"
                  height={96}
                  width={96}
                  src="/swipestatsFireLogo.svg"
                  alt=""
                />
                {/* <img className="h-24 w-auto" src="/swipestatsLogo.svg" alt="" /> */}
              </a>
            </Link>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-rose-600 uppercase tracking-wide">
                404 error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link href="/" passHref>
                  <a className="text-base font-medium text-rose-600 hover:text-rose-500">
                    Go back home<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4">
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
              Contact Support
            </a>
            <span className="inline-block border-l border-gray-300" aria-hidden="true" />
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
              Status
            </a>
            <span className="inline-block border-l border-gray-300" aria-hidden="true" />
            <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-600">
              Twitter
            </a>
          </nav>
        </footer>
        <style global jsx>{`
          html {
            height: 100% !important;
          }

          body {
            height: 100% !important;
          }
          #__next {
            height: 100%;
          }
        `}</style>
      </div>
    </>
  );
}
