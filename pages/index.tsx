import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { ChevronRightIcon, StarIcon } from '@heroicons/react/solid';
import { HeaderBanner } from '../components/tw/HeaderBanner';
import { EmailReminderSection } from '../components/tw/EmailReminderSection';
import {
  TrustPilotReviewCollector,
  TrustPilotMicroReviewCount,
} from '../components/plugins/Trustpilot';

import {
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
} from '@heroicons/react/outline';
import { Footer } from '../components/tw/Footer';
import DataRequestSupport from '../components/tw/DataRequestSupport';
import { Button } from '../components/tw/Button';
import { useLocalStorage } from '../lib/hooks/useStorage';
import { PressSection } from '../components/tw/PressSection';
import DataRequestCTA from '../components/tw/DataRequestCTA';
import { SwipestatsLogo } from '../components/svg/logos/swipestatsLogo';

const features = [
  {
    name: 'Parse the Tinder data file',
    icon: CloudUploadIcon,
    description: 'Extract anonymous data from the data.json file you get from Tinder',
  },
  {
    name: 'Submit your anonymized data',
    icon: LockClosedIcon,
    description: 'Upload the data and get additional insigths and metrics',
  },
  {
    name: 'Compare with others',
    icon: RefreshIcon,
    description: 'Visualize your data against others, or against segments og gender and age',
  },
  {
    name: 'Live demo',
    icon: CogIcon,
    description: 'Want to see the end result? Check out this live demo of a full profile',
  },

  // { name: 'Database Backups', icon: ServerIcon },
];

const stats = [
  { label: 'Founded', value: '2021' },
  { label: 'Employees', value: '5' },
  { label: 'Beta Users', value: '521' },
  { label: 'Raised', value: '$25M' },
];
const logos = [
  {
    name: 'Transistor',
    url: 'https://tailwindui.com/img/logos/transistor-logo-gray-400.svg',
  },
  {
    name: 'Mirage',
    url: 'https://tailwindui.com/img/logos/mirage-logo-gray-400.svg',
  },
  {
    name: 'Tuple',
    url: 'https://tailwindui.com/img/logos/tuple-logo-gray-400.svg',
  },
  {
    name: 'Laravel',
    url: 'https://tailwindui.com/img/logos/laravel-logo-gray-400.svg',
  },
  {
    name: 'StaticKit',
    url: 'https://tailwindui.com/img/logos/statickit-logo-gray-400.svg',
  },
  {
    name: 'Workcation',
    url: 'https://tailwindui.com/img/logos/workcation-logo-gray-400.svg',
  },
];

function TestimonialSection() {
  return (
    <div className="relative mt-20">
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
        <div className="relative sm:py-16 lg:py-0">
          <div
            aria-hidden="true"
            className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen"
          >
            <div className="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
            <svg
              className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
              width={404}
              height={392}
              fill="none"
              viewBox="0 0 404 392"
            >
              <defs>
                <pattern
                  id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
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
              <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
            </svg>
          </div>
          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
            {/* Testimonial card*/}
            <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1521510895919-46920266ddb3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&fp-x=0.5&fp-y=0.6&fp-z=3&width=1440&height=1440&sat=-100"
                alt=""
              />
              <div className="absolute inset-0 bg-rose-500 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-600 via-rose-600 opacity-90" />
              <div className="relative px-8">
                <div>
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/workcation.svg?color=white"
                    alt="Workcation"
                  />
                </div>
                <blockquote className="mt-8">
                  <div className="relative text-lg font-medium text-white md:flex-grow">
                    <svg
                      className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-rose-400"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="relative">
                      Tincidunt integer commodo, cursus etiam aliquam neque, et. Consectetur pretium
                      in volutpat, diam. Montes, magna cursus nulla feugiat dignissim id lobortis
                      amet.
                    </p>
                  </div>

                  <footer className="mt-4">
                    <p className="text-base font-semibold text-rose-200">
                      Sarah Williams, CEO at Workcation
                    </p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
          {/* Content area */}
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
              On a mission to democratize dating data
            </h2>
            <div className="mt-6 text-gray-500 space-y-6">
              <p className="text-lg">
                Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed
                consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu morbi.
                Cursus faucibus nunc nisl netus morbi vel porttitor vitae ut. Amet vitae fames
                senectus vitae.
              </p>
              <p className="text-base leading-7">
                Sollicitudin tristique eros erat odio sed vitae, consequat turpis elementum. Lorem
                nibh vel, eget pretium arcu vitae. Eros eu viverra donec ut volutpat donec laoreet
                quam urna. Sollicitudin tristique eros erat odio sed vitae, consequat turpis
                elementum. Lorem nibh vel, eget pretium arcu vitae. Eros eu viverra donec ut
                volutpat donec laoreet quam urna.
              </p>
              <p className="text-base leading-7">
                Rhoncus nisl, libero egestas diam fermentum dui. At quis tincidunt vel ultricies.
                Vulputate aliquet velit faucibus semper. Pellentesque in venenatis vestibulum
                consectetur nibh id. In id ut tempus egestas. Enim sit aliquam nec, a. Morbi enim
                fermentum lacus in. Viverra.
              </p>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-10">
            <dl className="grid grid-cols-2 gap-x-4 gap-y-8">
              {stats.map((stat) => (
                <div key={stat.label} className="border-t-2 border-gray-100 pt-6">
                  <dt className="text-base font-medium text-gray-500">{stat.label}</dt>
                  <dd className="text-3xl font-extrabold tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <a href="#" className="text-base font-medium text-rose-500">
                Learn more about how we&apos;re changing the world&nbsp&rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [dismissed, setDismissed] = useLocalStorage('SWIPESTATS_BANNER_DISMISSED', false);

  return (
    <div className="bg-white" id="home-page">
      {!dismissed && <HeaderBanner />}

      <Head>
        <title>Swipestats | Visualize your Tinder data</title>
        <meta name="title" content="Swipestats | Visualize your Tinder data" />
        <meta
          name="description"
          content="Upload your dating data anonymously and compare it to demographics from around the world!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://swipestats.io/" />
        <meta property="og:title" content="Swipestats | Visualize your Tinder data" />
        <meta
          property="og:description"
          content="Upload your dating data anonymously and compare it to demographics from around the world!"
        />
        <meta property="og:image" content="/ss2.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://swipestats.io/" />
        <meta property="twitter:title" content="Swipestats | Visualize your Tinder data" />
        <meta
          property="twitter:description"
          content="Upload your dating data anonymously and compare it to demographics from around the world!"
        />
        <meta property="twitter:image" content="/ss2.png" />

        <link rel="icon" href="/swipestatsFireLogo.svg" />
      </Head>

      <main>
        {/* Hero section */}
        <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
            <div>
              <div>
                <SwipestatsLogo className="h-20" />
              </div>

              <div className="mt-10">
                <div className="group">
                  <Link href="/changelog" passHref>
                    <a className="inline-flex space-x-4">
                      <span className="rounded bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-500 tracking-wide uppercase">
                        What&apos;s new
                      </span>
                      <span className="inline-flex group-hover:underline items-center text-sm font-medium text-rose-500 space-x-1">
                        <span>Just shipped version 2.0.0</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </a>
                  </Link>
                </div>
                <div className="mt-6 sm:max-w-xl">
                  <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Visualize your Tinder data
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    Upload your data anonymously and compare it to demographics from around the
                    world!
                  </p>
                </div>
                <div className="mt-12 sm:max-w-lg sm:w-full sm:flex">
                  <Link href="/upload/tinder/" passHref={true}>
                    <a className="mt-4 sm:mt-0">
                      <Button content="Get Insights" />
                    </a>
                  </Link>

                  <Link
                    href="/insights/?profileId=96d5e7ba8f42af5f40b1ea25a3deafc035ebd5350521b925a5e6478e2aebfee5"
                    passHref={true}
                  >
                    <a className="ml-3 ">
                      <Button content="Live Demo" category="secondary" />
                    </a>
                  </Link>
                  {/* <Link href="/#data-request-support" passHref={true}>
                    <a className="ml-3 inline-flex rounded-md shadow">
                      <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-rose-600 bg-white hover:bg-rose-50">
                        How do I get my data?
                      </button>
                    </a>
                  </Link> */}
                </div>
                {/* <div className="flex">
                  <TrustPilotReviewCollector />
                </div>
                <div>
                  <TrustPilotMicroReviewCount />
                </div> */}
                <div className="mt-6">
                  <div className="inline-flex items-center divide-x divide-gray-300">
                    <div className="flex-shrink-0 flex pr-5">
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1 pl-5 py-1 text-sm text-gray-500 sm:py-3">
                      <span className="font-medium text-gray-900">Rated 5 stars</span> by over{' '}
                      <span className="font-medium text-rose-500">1200 beta users</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
                <svg
                  className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
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
                  <rect
                    width={404}
                    height={392}
                    fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                  />
                </svg>
              </div>
              <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
                <img
                  className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                  src="/ss2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* featrues */}

        <div className="relative bg-white py-16 sm:pt-24">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-4xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-rose-600 uppercase">
              How it works
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              100% anonymous data visualization and comparison
            </p>
            <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
              The data file is NOT uploaded to a server, just used to extract your relevant,
              anonymous profile information.
            </p>
            <div className="mt-12">
              {/* className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" */}
              <div className="flex flex-wrap justify-center">
                {features.map((feature) => (
                  <div key={feature.name} className="pt-6">
                    <div className="w-full max-w-xs bg-gray-50 rounded-lg px-6 pb-8 sm:mx-8 mb-8">
                      <div className="">
                        <div>
                          <span className="inline-flex items-center justify-center p-3 bg-rose-500 rounded-md shadow-lg -mt-6">
                            <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                          </span>
                        </div>
                        <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                          {feature.name}
                        </h3>
                        <p className="mt-5 text-base text-gray-500">
                          {/* Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna
                          sit morbi lobortis. */}
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-6">
                  <div className="w-full max-w-xs bg-gray-50 rounded-lg px-6 pb-8 sm:mx-8 mb-8">
                    <div className="">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-rose-500 rounded-md shadow-lg -mt-6">
                          {/* <feature.icon className="h-6 w-6 text-white" aria-hidden="true" /> */}
                          <ShieldCheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        Open source on Github
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {/* Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna
                          sit morbi lobortis. */}
                        {/* {feature.description} */}
                        This project is completely open source.{' '}
                        <a
                          href="https://github.com/kristianeboe/swipestats"
                          target={'_blank'}
                          rel="noreferrer"
                          className="text-rose-500 hover:underline"
                        >
                          Inspect the code yourself, and even contribute!
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* features end */}

        {false && <TestimonialSection />}

        {/* Logo cloud section */}
        {false && (
          <div className="mt-32">
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
              <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
                <div>
                  <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                    Backed by world-renowned investors
                  </h2>
                  <p className="mt-6 max-w-3xl text-lg leading-7 text-gray-500">
                    Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed
                    consectetur neque tristique pellentesque. Blandit amet, sed aenean erat arcu
                    morbi. Cursus faucibus nunc nisl netus morbi vel porttitor vitae ut. Amet vitae
                    fames senectus vitae.
                  </p>
                  <div className="mt-6">
                    <a href="#" className="text-base font-medium text-rose-500">
                      Meet our investors and advisors&nbsp&rarr;
                    </a>
                  </div>
                </div>
                <div className="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
                  {logos.map((logo) => (
                    <div
                      key={logo.name}
                      className="col-span-1 flex justify-center py-8 px-8 bg-gray-50"
                    >
                      <img className="max-h-12" src={logo.url} alt={logo.name} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 md:flex md:items-center md:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to explore?</span>
              <span className="block text-rose-600">Upload your data today</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link href={'/upload/tinder?from=index-cta'} passHref>
                  <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700">
                    Get started
                  </a>
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  href={
                    '/insights/?profileId=96d5e7ba8f42af5f40b1ea25a3deafc035ebd5350521b925a5e6478e2aebfee5&demo=true'
                  }
                  passHref
                >
                  <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-rose-600 bg-white hover:bg-rose-50">
                    Live demo
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <DataRequestSupport />

        <EmailReminderSection />
        <PressSection />
        <DataRequestCTA />
      </main>

      {/* Footer section */}
      <Footer />
    </div>
  );
}
