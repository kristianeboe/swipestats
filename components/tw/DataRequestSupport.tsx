/* This example requires Tailwind CSS v2.0+ */
import { NewspaperIcon, PhoneIcon, SupportIcon } from '@heroicons/react/outline';

const supportLinks = [
  {
    name: 'Tinder',
    href: 'https://www.help.tinder.com/hc/en-us/articles/115005626726-How-do-I-request-a-copy-of-my-personal-data-',
    description:
      'Easy! Follow the instructions to request the data, wait 1-3 days and receive a link to download your personal tinder.json. Then come back here!',
    icon: PhoneIcon,
  },
  {
    name: 'Bumble',
    href: 'https://bumble.com/en/help/how-can-i-request-my-data-or-retrieve-past-conversations',
    description:
      'This process is a bit more manual and time consuming. After you submit your data request it can take up to 30 days before you get a reply.',
    icon: SupportIcon,
  },
  {
    name: 'Hinge',
    href: 'https://hingeapp.zendesk.com/hc/en-us/articles/360004792234-Data-Requests',
    description:
      'In Hinge you start the data request inside the app. All the steps are outlined in their help article linked here.',
    icon: NewspaperIcon,
  },
];

export default function DataRequestSupport() {
  return (
    <div className="bg-white" id="data-request-support">
      {/* Header */}
      <div className="relative pb-32 bg-gray-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100"
            alt=""
          />
          <div className="absolute inset-0 bg-gray-800 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            How to request your data
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-gray-300">
            Requesting your data is easy, but it is not automatic. You usually need to log into your
            providers account, fill out a form and wait up to 24 hours. Instructions below:
          </p>
        </div>
      </div>

      {/* Overlapping cards */}
      <section
        className="-mt-32 max-w-7xl mx-auto relative z-10 pb-32 px-4 sm:px-6 lg:px-8"
        aria-labelledby="contact-heading"
      >
        <h2 className="sr-only" id="contact-heading">
          How to request your data
        </h2>
        <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-3 lg:gap-y-0 lg:gap-x-8">
          {supportLinks.map((link) => (
            <div key={link.name} className="flex flex-col bg-white rounded-2xl shadow-xl">
              <div className="flex-1 relative pt-16 px-6 pb-8 md:px-8">
                <div className="absolute top-0 p-5 inline-block bg-rose-600 rounded-xl shadow-lg transform -translate-y-1/2">
                  <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-medium text-gray-900">{link.name}</h3>
                <p className="mt-4 text-base text-gray-500">{link.description}</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-bl-2xl rounded-br-2xl md:px-8">
                <a
                  href={link.href}
                  target="_blank"
                  className="text-base font-medium text-rose-700 hover:text-rose-600"
                  rel="noreferrer"
                >
                  Start here<span aria-hidden="true"> &rarr;</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
