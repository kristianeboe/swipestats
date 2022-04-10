/* This example requires Tailwind CSS v2.0+ */
import { CheckIcon } from '@heroicons/react/outline';
import { Footer } from '../components/tw/Footer';

const hobbyFeatures = [
  '100 anonymized profiles',
  'Perfect to test out the datamodel',
  // 'Vel ipsa esse repudiandae',
];
const scaleFeatures = [
  "Can't pay for a dataset?",
  'Need specific user segments?',
  'Want to say hi?',
];
const growthFeatures = [
  '1000 anonymized profiles',
  'Analyze at Scale',
  'Direct support',

  // 'Laborum commodi molestiae id et fugiat',
  // 'Nam ut ipsa nesciunt culpa modi dolor',
];

export default function ResearchPage() {
  return (
    <div>
      <div className="bg-gray-900">
        <div className="pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
          <div className="text-center">
            <h2 className="text-lg leading-6 font-semibold text-rose-500 uppercase tracking-wider">
              Research
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Get your own dataset
            </p>
            <p className="mt-3 max-w-4xl mx-auto text-xl text-gray-300 sm:mt-5 sm:text-2xl">
              Wether it&apos;s for a blog, a research paper, or plain curiosity, a dataset from
              Swipestats will get you on the right track.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white pb-12 lg:mt-20 lg:pb-20">
          <div className="relative z-0">
            <div className="absolute inset-0 h-5/6 bg-gray-900 lg:h-2/3" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative lg:grid lg:grid-cols-7">
                <div className="mx-auto max-w-md lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3">
                  <div className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-l-lg">
                    <div className="flex-1 flex flex-col">
                      <div className="bg-white px-6 py-10">
                        <div>
                          <h3
                            className="text-center text-2xl font-medium text-gray-900"
                            id="tier-sample"
                          >
                            Small Sample
                          </h3>
                          <div className="mt-4 flex items-center justify-center">
                            <span className="px-3 flex items-start text-6xl tracking-tight text-gray-900">
                              <span className="mt-2 mr-2 text-4xl font-medium">$</span>
                              <span className="font-extrabold">10</span>
                            </span>
                            {/* <span className="text-xl font-medium text-gray-500">/month</span> */}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
                        <ul role="list" className="space-y-4">
                          {hobbyFeatures.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <div className="flex-shrink-0">
                                <CheckIcon
                                  className="flex-shrink-0 h-6 w-6 text-green-500"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-3 text-base font-medium text-gray-500">{feature}</p>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8">
                          <div className="rounded-lg shadow-md">
                            <a
                              href="mailto:kristian.e.boe@gmail.com?subject=Swipestats%20Data%20Request%3A%20Sample&body=This%20tier%20is%20currently%20free%2C%20just%20write%20me%20what%20you%20are%20intending%20to%20use%20the%20data%20for%20and%20I'll%20reach%20out%20with%20the%20dataset."
                              target="_blank"
                              className="block w-full text-center rounded-lg border border-transparent bg-white px-6 py-3 text-base font-medium text-rose-600 hover:bg-gray-50"
                              aria-describedby="tier-sample"
                              rel="noreferrer"
                            >
                              Start analyzing
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4">
                  <div className="relative z-10 rounded-lg shadow-xl">
                    <div
                      className="pointer-events-none absolute inset-0 rounded-lg border-2 border-rose-600"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 top-0 transform translate-y-px">
                      <div className="flex justify-center transform -translate-y-1/2">
                        <span className="inline-flex rounded-full bg-rose-600 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white">
                          Most popular
                        </span>
                      </div>
                    </div>
                    <div className="bg-white rounded-t-lg px-6 pt-12 pb-10">
                      <div>
                        <h3
                          className="text-center text-3xl font-semibold text-gray-900 sm:-mx-6"
                          id="tier-scale"
                        >
                          Full package
                        </h3>
                        <div className="mt-4 flex items-center justify-center">
                          <span className="px-3 flex items-start text-6xl tracking-tight text-gray-900 sm:text-6xl">
                            <span className="mt-2 mr-2 text-4xl font-medium">$</span>
                            <span className="font-extrabold">25</span>
                          </span>
                          {/* <span className="text-2xl font-medium text-gray-500">/month</span> */}
                        </div>
                      </div>
                    </div>
                    <div className="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10">
                      <ul role="list" className="space-y-4">
                        {growthFeatures.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <div className="flex-shrink-0">
                              <CheckIcon
                                className="flex-shrink-0 h-6 w-6 text-green-500"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="ml-3 text-base font-medium text-gray-500">{feature}</p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-10">
                        <div className="rounded-lg shadow-md">
                          <a
                            href="mailto:kristian.e.boe@gmail.com?subject=Swipestats%20Data%20Request%3A%20Scale&body=This%20tier%20is%20currently%20free%2C%20just%20write%20me%20what%20you%20are%20intending%20to%20use%20the%20data%20for%20and%20I'll%20reach%20out%20with%20the%20dataset."
                            className="block w-full text-center rounded-lg border border-transparent bg-rose-600 px-6 py-4 text-xl leading-6 font-medium text-white hover:bg-rose-700"
                            aria-describedby="tier-scale"
                            target="_blank"
                            rel="noreferrer"
                          >
                            Start analyzing
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 mx-auto max-w-md lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3">
                  <div className="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-r-lg">
                    <div className="flex-1 flex flex-col">
                      <div className="bg-white px-6 py-10">
                        <div>
                          <h3
                            className="text-center text-2xl font-medium text-gray-900"
                            id="tier-custom"
                          >
                            Custom request
                          </h3>
                          <div className="mt-4 flex items-center justify-center">
                            <span className="px-3 flex items-start text-4xl tracking-tight text-gray-900">
                              {/* <span className="mt-2 mr-2 text-4xl font-medium">$</span> */}
                              <span className="font-extrabold">Get in touch</span>
                            </span>
                            {/* <span className="text-xl font-medium text-gray-500">/month</span> */}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between border-t-2 border-gray-100 p-6 bg-gray-50 sm:p-10 lg:p-6 xl:p-10">
                        <ul role="list" className="space-y-4">
                          {scaleFeatures.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <div className="flex-shrink-0">
                                <CheckIcon
                                  className="flex-shrink-0 h-6 w-6 text-green-500"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-3 text-base font-medium text-gray-500">{feature}</p>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-8">
                          <div className="rounded-lg shadow-md">
                            <a
                              href="mailto:kristian.e.boe@gmail.com?subject=Swipestats%20Data%20Request%3A%20Scale&body=This%20tier%20is%20currently%20free%2C%20just%20write%20me%20what%20you%20are%20intending%20to%20use%20the%20data%20for%20and%20I'll%20reach%20out%20with%20the%20dataset."
                              target="_blank"
                              className="block w-full text-center rounded-lg border border-transparent bg-white px-6 py-3 text-base font-medium text-rose-600 hover:bg-gray-50"
                              aria-describedby="tier-custom"
                              rel="noreferrer"
                            >
                              Reach out
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FAQs />
      <section className="bg-rose-800">
        <div className="max-w-7xl mx-auto md:grid md:grid-cols-2 md:px-6 lg:px-8">
          <div className="py-12 px-4 sm:px-6 md:flex md:flex-col md:py-16 md:pl-0 md:pr-10 md:border-r md:border-rose-900 lg:pr-16">
            <div className="md:flex-shrink-0">
              {/* <img
                className="h-12"
                src="https://tailwindui.com/img/logos/tuple-logo-rose-300.svg"
                alt="Tuple"
              /> */}
            </div>
            <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">
              <div className="relative text-lg font-medium text-white md:flex-grow">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-rose-600"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative h-24">
                  Wow! Increadible to have real world, already anonymized data to work with so
                  easily. Definitely a great start for anyone looking to get into writing about data
                  science.
                </p>
              </div>
              <footer className="mt-8">
                <div className="flex items-start">
                  {/* <div className="flex-shrink-0 mr-4 inline-flex rounded-full border-2 border-white">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div> */}
                  <div className="">
                    <div className="text-base font-medium text-white">Amanda A.</div>
                    {/* <div className="text-base font-medium text-rose-200">CEO, Tuple</div> */}
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
          <div className="py-12 px-4 border-t-2 border-rose-900 sm:px-6 md:py-16 md:pr-0 md:pl-10 md:border-t-0 md:border-l lg:pl-16">
            <div className="md:flex-shrink-0">
              {/* <img
                className="h-12"
                src="https://tailwindui.com/img/logos/workcation-logo-rose-300.svg"
                alt="Workcation"
              /> */}
            </div>
            <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">
              <div className="relative text-lg font-medium text-white md:flex-grow">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-rose-600"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative h-24">
                  Pretty sure this project helped me get an A in my uni class 😅.
                </p>
              </div>
              <footer className="mt-8">
                <div className="flex items-start">
                  {/* <div className="flex-shrink-0 mr-4 inline-flex rounded-full border-2 border-white">
                    <img
                      className="h-12 w-12 rounded-full"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div> */}
                  <div className="">
                    <div className="text-base font-medium text-white">Stephen W.</div>
                    {/* <div className="text-base font-medium text-rose-200">CEO, Workcation</div> */}
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

/* This example requires Tailwind CSS v2.0+ */
const faqs = [
  {
    id: 1,
    question: 'Why is this not free?',
    answer:
      'I ran this service for free for over a year, but as more and more people upload the data the running costs of the service grow as well. Any proceeds go to running and further developing the platform.',
  },
  {
    id: 2,
    question: 'Can I use this data for univeristy?',
    answer: 'Sure, that is a popular use case! Just give credit to the project in your paper.',
  },
  {
    id: 3,
    question: 'Can I blog about this?',
    answer:
      'That is another popular use case! Just give a shoutout to the project and we are all good :)',
  },
  {
    id: 4,
    question: 'How is this different from selling personal data?',
    answer:
      "The core of Swipestats is that all data is anonymized even before it hits the server. So it is not like selling personal data, more like giving insights into various user segments of the world's most popular dating apps.",
  },

  // More questions...
];

export function FAQs() {
  return (
    <div className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:max-w-2xl lg:mx-auto lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          {/* <p className="mt-4 text-gray-400">
            Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing
            sagittis vel nulla nec. Urna, sed a lectus elementum blandit et.
          </p> */}
        </div>
        <div className="mt-20">
          <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="font-semibold text-white">{faq.question}</dt>
                <dd className="mt-3 text-gray-400">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
