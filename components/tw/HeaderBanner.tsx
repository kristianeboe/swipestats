/* This example requires Tailwind CSS v2.0+ */
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';
import { useLocalStorage } from '../../lib/hooks/useStorage';
import { useTracking } from '../providers/TrackingProvider';

export function HeaderBanner() {
  const [dismissed, setDismissed] = useLocalStorage('SWIPESTATS_BANNER_DISMISSED', true);
  const { track } = useTracking();
  return dismissed ? null : (
    <div className="bg-rose-600">
      <div className="mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-rose-800">
              <SpeakerphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">We announced a new product!</span>
              <span className="hidden md:inline">
                Big news! We&apos;re excited to announce a brand new Swipestats.io
              </span>
            </p>
          </div>
          <div className="order-4 mt-2 flex-shrink-0 w-full sm:order-2 sm:mr-2 sm:mt-0 sm:w-auto">
            <a
              href="#"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-rose-600 bg-white hover:bg-rose-50"
            >
              Learn more
            </a>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href="https://swipestats.io"
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-rose-600 bg-white hover:bg-rose-50"
            >
              Old version
            </a>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex p-2 rounded-md hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
              onClick={() => {
                setDismissed(true);
                track('Banner Dismissed', {});
              }}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
