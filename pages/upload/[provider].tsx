import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Footer } from '../../components/tw/Footer';
import Navbar from '../../components/tw/Navbar';
import { UploadArea } from '../../components/UploadArea';
import { UploadProfileCard } from '../../components/UploadProfileCard';
import { FullTinderDataJSON } from '../../interfaces/TinderDataJSON';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import ky from 'ky-universal';
import { Button } from '../../components/tw/Button';
import { classNames } from '../../lib/utils';
import StepHeader from '../../components/tw/StepHeader';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { useClientRouter } from "use-client-router";
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { UploadCTA } from '../../components/UploadCTA';
import { useTracking } from '../../components/providers/TrackingProvider';
import { createSwipestatsProfilePayloadFromJson } from '../../lib/extractAnonymizedData';
import { SwipestatsProfile } from '../../interfaces/SwipestatsProfile';
import { SwipestatsProfilePayload } from '../api/profiles';
// import testData from '../../fixtures/kristian-data.json';

export type ProviderId = 'tinder' | 'hinge' | 'bumble';
interface DataProvider {
  id: ProviderId;
  title: 'Tinder' | 'Hinge' | 'Bumble';
  description: string;
  users: string;
}

const dataProviders: DataProvider[] = [
  {
    id: 'tinder',
    title: 'Tinder',
    description: "The world's most popular dating app.", //, making it the place to meet new people.",
    users: '621 users',
  },
  {
    id: 'hinge',
    title: 'Hinge',
    description: 'The dating app designed to be deleted.', // Hinge is built on the belief that anyone looking for love should be able to find it.',
    users: '1200 users',
  },
  {
    id: 'bumble',
    title: 'Bumble',
    description: 'Women make the first move.', // 'Bumble has changed the way people date, find friends, and the perception of meeting online, for the better. Women make the first move.',
    users: '2740 users',
  },
];

// async function getServerSideProps(context): GetServerSideProps {
//     const { id } = context.query;

// }
export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryProviderId = context.query.provider as string;

  return {
    props: {
      queryProviderId,
    },
  };
};

export default function UploadPage({ queryProviderId }: { queryProviderId: ProviderId }) {
  //   const { provider: providerId } = router.query;
  const [jsonProfile, setJsonProfile] = useState<FullTinderDataJSON | null>(null);
  const [swipestatsProfilePayload, setSwipestatsProfilePayload] =
    useState<SwipestatsProfilePayload | null>(null);
  const { track } = useTracking();

  const routerProvider = dataProviders.find((p) => p.id === queryProviderId);
  const [selectedDataProvider, setDataProvider] = useState(routerProvider ?? dataProviders[0]);

  if (routerProvider && routerProvider.id !== selectedDataProvider.id) {
    setDataProvider(routerProvider);
  }

  async function onAcceptedFileLoad(data: string) {
    // console.log('json data', data);
    setJsonProfile(JSON.parse(data));
    try {
      const payload = await createSwipestatsProfilePayloadFromJson(data, selectedDataProvider.id);
      setSwipestatsProfilePayload(payload);
      track('Profile Anonymised Successfully', {
        providerId: selectedDataProvider.id,
      });
    } catch (error) {
      console.error(error);
      track('Profile Anonymised Failed', {
        providerId: selectedDataProvider.id,
      });
    }
  }

  return (
    <div>
      <Head>
        <title>Upload your {selectedDataProvider.title} data | Swipestats</title>
        <meta
          name="description"
          content={`Upload your ${selectedDataProvider.title} data anonymously and compare it to demographics from around the world!`}
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={'https://swipestats.io/upload/' + selectedDataProvider.id}
        />
        <meta property="og:title" content="Swipestats | Visualize your Tinder data" />
        <meta
          property="og:description"
          content="Upload your dating data anonymously and compare it to demographics from around the world!"
        />
        <meta property="og:image" content="/ss2.png" />
      </Head>
      <div className="min-h-screen">
        {/* <Navbar simple={true} /> */}
        <StepHeader />
        <div className="bg-white">
          {!jsonProfile && (
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-base font-semibold text-rose-600 tracking-wide uppercase">
                  Upload
                </h2>
                <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                  Visualize your {selectedDataProvider.title} data
                </p>
                <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                  Upload your data anonymously and compare it to demographics from around the world!
                </p>
              </div>

              <RadioGroup value={selectedDataProvider} onChange={setDataProvider}>
                <RadioGroup.Label className="text-base font-medium text-gray-900 sr-only">
                  Select a data provider
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                  {dataProviders.map((dataProvider) => (
                    <Link key={dataProvider.id} href={`/upload/${dataProvider.id}/`} passHref>
                      <a>
                        <RadioGroup.Option
                          value={dataProvider}
                          className={({ checked, active }) =>
                            classNames(
                              checked ? 'border-transparent' : 'border-gray-300',
                              active ? 'ring-2 ring-rose-500' : '',
                              'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none'
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <div className="flex-1 flex">
                                <div className="flex flex-col">
                                  <RadioGroup.Label
                                    as="span"
                                    className="block text-sm font-medium text-gray-900"
                                  >
                                    {dataProvider.title}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className="mt-1 flex items-center text-sm text-gray-500"
                                  >
                                    {dataProvider.description}
                                  </RadioGroup.Description>
                                  {/* <RadioGroup.Description
                                as="span"
                                className="mt-6 text-sm font-medium text-gray-900"
                              >
                                {dataProvider.users}
                              </RadioGroup.Description> */}
                                </div>
                              </div>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-rose-600'
                                )}
                                aria-hidden="true"
                              />
                              <div
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-rose-500' : 'border-transparent',
                                  'absolute -inset-px rounded-lg pointer-events-none'
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      </a>
                    </Link>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}
        </div>

        {selectedDataProvider.title === 'Tinder' ? (
          <div className="">
            <div className="flex flex-col justify-center items-center">
              {jsonProfile && swipestatsProfilePayload ? (
                <UploadCTA
                  swipestatsProfilePayload={swipestatsProfilePayload}
                  jsonProfile={jsonProfile}
                />
              ) : (
                <>
                  <UploadArea onAcceptedFileLoad={onAcceptedFileLoad} />
                  {/* <div className="flex">
                    <button onClick={() => {
                      const payload = await createSwipestatsProfilePayloadFromJson(JSON.stringify(testData), selectedDataProvider.id);
      setSwipestatsProfilePayload(payload);
                    } }>
                      Use test file
                    </button>
                  </div> */}
                </>
              )}
              {/* <div>
        Files
        {files.map((f) => (
          <p key={f.name}>{f.name}</p>
        ))}
      </div> */}
            </div>
          </div>
        ) : (
          <WaitlistCTA dataProvider={selectedDataProvider} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export function WaitlistCTA({ dataProvider }: { dataProvider: DataProvider }) {
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState<'' | 'success' | 'error'>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormStatus('');
  }, [dataProvider]);

  async function addEmailToWaitlist(e: any) {
    e.preventDefault();
    setLoading(true);
    await ky
      .post('/api/waitlist', {
        json: {
          email,
          dataProvider: dataProvider.id,
        },
      })
      .then((res) => {
        setFormStatus('success');
      })
      .catch((e) => {
        console.error(e);
        setFormStatus('error');
      });

    setLoading(false);
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4  sm:px-6  lg:px-8">
        <div className="py-10 px-6 bg-rose-700 rounded-3xl sm:py-16 sm:px-12 lg:p-20 lg:flex lg:items-center">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              {dataProvider.title} is not available yet
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-rose-100">
              But we are working on it! Leave your email here to get notified when we support them!
            </p>
          </div>
          <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
            {formStatus ? (
              formStatus === 'error' ? (
                <div> Error</div>
              ) : (
                // <p className="text-rose-100">Email saved</p>
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">Subscribed 🎉</p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <form className="sm:flex" onSubmit={addEmailToWaitlist}>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  disabled={loading}
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-rose-700 focus:ring-white rounded-md"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button loading={loading} category="flex" type="submit" content="Notify me" />
              </form>
            )}

            <p className="mt-3 text-sm text-rose-100">
              We care about the protection of your data. Read our{' '}
              <a href="#" className="text-white font-medium underline">
                Privacy Policy.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
