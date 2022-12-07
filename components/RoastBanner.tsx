import { StarIcon } from '@heroicons/react/solid';
import React from 'react';
import { useTracking } from './providers/TrackingProvider';

export default function RoastBanner() {
  const { track } = useTracking();

  return (
    <div className="relative sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-md px-4 overflow-hidden sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-rose-600 px-6 py-10 shadow-xl sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0 flex">
            <svg
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 1463 360"
            >
              <path
                className="text-rose-500 text-opacity-40"
                fill="currentColor"
                d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
              />
              <path
                className="text-rose-700 text-opacity-40"
                fill="currentColor"
                d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
              />
            </svg>
          </div>
          <div className="relative">
            <div className="">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Want to improve your conversion rate? <br /> Take this test now
              </h2>
              <p className=" mt-6 max-w-xl text-lg text-white">
                Take this 2-min quiz, optimize your profile instantly, and boost your stats for
                good!
              </p>
            </div>

            <div className="mt-12 sm:flex sm:max-w-lg">
              <a href="https://roast.dating/sw" target={'_blank'} rel="noreferrer">
                <div className="mt-4 sm:mt-0">
                  <button
                    onClick={() => track('Try Roast CTA', {})}
                    type="submit"
                    className="block w-full rounded-md border border-transparent bg-black  px-5 py-3 text-base font-medium text-white shadow hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-rose-600 sm:px-10"
                  >
                    Try now
                  </button>
                </div>
              </a>
            </div>
            <div className="sm:flex mt-5 sm:space-x-4 text-white">
              <div className="flex-shrink-0 flex pr-5">
                <StarIcon className="h-5 w-5" aria-hidden="true" />
                <StarIcon className="h-5 w-5" aria-hidden="true" />
                <StarIcon className="h-5 w-5" aria-hidden="true" />
                <StarIcon className="h-5 w-5" aria-hidden="true" />
                <StarIcon className="h-5 w-5 " aria-hidden="true" />
              </div>
              <span>Join 75,000 happy users</span>
            </div>
          </div>
          <div className="absolute hidden lg:flex -right-96 -top-16 overflow-hidden items-center w-3/4 ">
            <img
              src="/images/roastPeople.png"
              className="overflow-hidden"
              alt="roast dating cta image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
