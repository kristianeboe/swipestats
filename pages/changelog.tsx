import React from 'react';

export default function Changelog() {
  return (
    <div className="relative py-16 bg-white overflow-hidden">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <span className="block text-base text-center text-rose-600 font-semibold tracking-wide ">
              May 1st 2022
            </span>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Swipestats 2.0
            </span>
          </h1>
          <p className="mt-8 text-xl text-gray-500 leading-8">
            After more than a year in beta I finally created an update of Swipestats.io.
          </p>
        </div>
        <div className="mt-6 prose prose-rose prose-lg text-gray-500 mx-auto">
          <p>
            This time with a focus on more than just Tinder data. The site now also aims to support
            Bumble, Hinge, and potentially other dating apps too. Some of the new features in ths
            release are
          </p>
          <ul role="list">
            <li>Updated data parsing and upload flow</li>
            <li>Self service data request and download</li>
            <li>New landing page</li>
          </ul>
          <p>Everything is still 100% open source and anonymous.</p>
        </div>
      </div>
    </div>
  );
}
