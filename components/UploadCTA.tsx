import ky from 'ky';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FullTinderDataJSON } from '../interfaces/TinderDataJSON';
import debug, { logger } from '../lib/debug';
import { SwipestatsProfilePayload } from '../pages/api/profiles';
import { UploadProfileCard } from './UploadProfileCard';
import { Button } from '../components/tw/Button';
import { useTracking } from './providers/TrackingProvider';
import { TinderProfilePrisma } from '../pages/api/profiles/index';

const log = logger(debug('upload-cta'));
export function UploadCTA(props: {
  swipestatsProfilePayload: SwipestatsProfilePayload;
  jsonProfile: FullTinderDataJSON;
}) {
  const router = useRouter();
  const { track } = useTracking();
  const [loading, setLoading] = useState(false);

  async function createProfile() {
    log('Initiate upload');
    setLoading(true);

    await ky
      .post('/api/profiles', {
        json: props.swipestatsProfilePayload,
        timeout: false,
      })
      .json<TinderProfilePrisma>()
      .then((tinderProfile) => {
        log('Tinder profile created API Return %O', tinderProfile);
        track('Tinder profile created', {
          tinderId: tinderProfile.tinderId,
        });
        router.push('/insights/?id=' + tinderProfile.tinderId);
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
      });
  }

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
            {/* <Link href="/insights/" passHref> */}
            <Button onClick={createProfile} content="Upload" loading={loading} />
            {/* <a className="rounded-md shadow">
              <button
                onClick={createProfile}
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 md:py-4 md:text-lg md:px-10"
              >
                Upload
              </button>
            </a> */}
            {/* </Link> */}
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
