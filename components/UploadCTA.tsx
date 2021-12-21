import Link from 'next/link';
import { TinderDataJSON } from '../interfaces/DataJSON';
import { UploadProfileCard } from './UploadProfileCard';

export function UploadCTA(props: { jsonProfile: TinderDataJSON }) {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-around items-center">
        <div className="text-center md:text-left ">
          <h2 className="text-base font-semibold text-rose-600 tracking-wide uppercase">Upload</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Ready
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Upload your data anonymously and compare it to demographics from around the world!
          </p>
          <div className="mt-5 max-w-md  flex  md:mt-8 justify-center mx-auto md:mx-0  md:justify-start  ">
            <Link href="/insights/" passHref>
              <a className="rounded-md shadow">
                <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 md:py-4 md:text-lg md:px-10">
                  Upload
                </button>
              </a>
            </Link>
            <Link href="/insights/" passHref={true}>
              <a className="ml-3 inline-flex rounded-md shadow">
                <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-rose-600 bg-white hover:bg-rose-50">
                  Live demo
                </button>
              </a>
            </Link>
          </div>
        </div>
        <div className="pt-24">
          <UploadProfileCard dataJSON={props.jsonProfile} />
        </div>
      </div>
    </div>
  );
}
