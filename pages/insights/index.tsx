// import KristianData from '../../fixtures/kristian-data.json';
// import DeepaData from '../../fixtures/deepa-data.json';
import { FullTinderDataJSON } from '../../interfaces/TinderDataJSON';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { DateValueMap } from '../../interfaces/utilInterfaces';
import { Alert } from '../../components/tw/Alert';
import ky from 'ky';
import { TinderProfilePrisma } from '../api/profiles';
import debug, { logger } from '../../lib/debug';
import { GetServerSideProps } from 'next';
import toast from 'react-hot-toast';
import { getAgeFromBirthdate, getLabelForTinderProfile } from '../../lib/utils';
import Head from 'next/head';
import Stats from '../../components/modules/insights/stats';
import { AppLayout } from '../../components/layouts/AppLayout';
import { useQuery } from 'react-query';
import { fetchProfiles } from '../../lib/api';

import { Chart } from '../../components/charts/Chart';
import RoastBanner from '../../components/RoastBanner';
import DataRequestCTA from '../../components/tw/DataRequestCTA';
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer } from 'recharts';
const log = logger(debug('insights'));

function aggregateDataPrMonthForChart(dataObject: DateValueMap) {
  // Use reduce to aggregate your data. Pass around a hash so that we have
  // direct access to groups as well as ensure groups appear just once.
  var dataByMonth = Object.entries(dataObject).reduce(function (dataByMonth, [x, y]) {
    var date = new Date(x);
    var value = y;
    var month = date.getMonth() + 1 + ''; // i think this is right?
    var year = date.getFullYear() + '';
    var group = year + '-' + month.padStart(2, '0') + '-' + '01';

    dataByMonth[group] = (dataByMonth[group] || 0) + value;

    return dataByMonth;
  }, {} as { [key: string]: number });

  return Object.entries(dataByMonth).map(([x, y]) => ({ x, y }));
  // Now just turn the hash into an array.
  // var finalResult = Object.keys(dataObjectByMonth).map(function (group) {
  //   return { name: group, value: dataByMonth[group] };
  // });

  // return finalResult;
}

function djb2(str: string) {
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i); /* hash * 33 + c */
  }
  return hash;
}

function hashStringToColor(str: string, opacity: number = 1) {
  var hash = djb2(str);
  var r = (hash & 0xff0000) >> 16;
  var g = (hash & 0x00ff00) >> 8;
  var b = hash & 0x0000ff;
  // return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
  return 'rgba(' + r + ',' + g + ',' + b + ', ' + opacity + ')';
}

// Returns an array of 3 values for rgb
function randomRGB(opacity: number = 1) {
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  return 'rgba(' + [red, green, blue, opacity].join(',') + ')';
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryProfileId = context.query.profileId as string;

  return {
    props: {
      queryProfileId,
    },
  };
};

const chartTitleMap = {
  matches: 'Matches',
  appOpens: 'App opens',
  swipeLikes: 'Swipe likes',
  swipePasses: 'Swipe passes',
  messagesSent: 'Messages sent',
  messagesReceived: 'Messages received',
};

export default function InsightsPage({ queryProfileId }: { queryProfileId?: string }) {
  // @ts-ignore
  // const testData: FullTinderDataJSON = KristianData;
  // const data = testData;
  // const usageChartKeys = [
  //   'matches',
  //   'app_opens',
  //   'swipes_likes',
  //   'swipes_passes',
  //   'messages_sent',
  //   'messages_received',
  // ] as const;
  const usageChartKeys = [
    'matches',
    'appOpens',
    'swipeLikes',
    'swipePasses',
    'messagesSent',
    'messagesReceived',
  ] as const;
  const router = useRouter();

  const [profiles, setProfiles] = useState<TinderProfilePrisma[]>([]);
  const [me, ...others] = profiles;

  async function compareWithUser(id: string) {
    if (!profiles.some((p) => p.tinderId === id)) {
      const newProfile = await fetchProfiles([id]).catch((e) => {
        setErrors([e]);
        notify('Fetch failed for ' + id);
      });
      if (newProfile) {
        notify('Fetched profile for ' + getLabelForTinderProfile(newProfile));
        setProfiles([...profiles, newProfile]);
      }
    } else {
      toast('Profile already imported');
    }
  }

  const [errors, setErrors] = useState<any[]>([]);

  useEffect(() => {
    async function initialProfiles(id: string) {
      const p1 = await fetchProfiles([id]);
      notify('Fetched profile for ' + getLabelForTinderProfile(p1));
      // const p2 = await fetchProfiles([
      //   'f82796aafac3d4dcf7bb21fafca151a3739f188b6970946654e09da11f659115',
      // ]);
      // notify('Fetched profile for ' + getLabelForTinderProfile(p2));
      // const p3 = await fetchProfiles([
      //   '3f4b3a376a55ccbf7b57de1c1e19891ef36bd7ccdf370037e339d251ba5c85e9',
      // ]);
      // notify('Fetched profile for ' + getLabelForTinderProfile(p3));

      if (p1) {
        // setProfiles([tp]);
        setProfiles([
          p1,
          // p2,
          //  p3
        ]);
      } else {
        notify('No profile found');
      }
    }
    if (queryProfileId) {
      initialProfiles(queryProfileId).catch((e) => {
        setErrors([e]);
        notify('Fetch failed');
      });
    }
  }, [queryProfileId]);

  // const matches = data.Usage.matches;

  // const matchesDataset = {
  //   label: 'Kristian',
  //   borderColor: 'rgb(255, 99, 132)',
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //   data: aggregateDataPrMonthForChart(matches),
  // };

  // const deepaDataset = {
  //   label: 'Deepa',
  //   data: aggregateDataPrMonthForChart(DeepaData.Usage.matches), //labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
  //   borderColor: 'rgb(53, 162, 235)',
  //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
  // };

  profiles.map((p) => {
    log('loaded profile %O', {
      p,
      keys: Object.keys(p),
    });
  });

  const datasets = usageChartKeys.map((key) =>
    profiles.map((p, index) => {
      const baseColor = randomRGB();
      const birthDate = new Date(p.birthDate).toISOString();
      const aggregateDataForKey = aggregateDataPrMonthForChart(p[key] as DateValueMap);

      return {
        key: key,
        label: getLabelForTinderProfile(p),
        borderColor: index === 0 ? 'rgb(255, 99, 132)' : hashStringToColor(birthDate), //: randomRGB(), // 'rgb(255, 99, 132)',
        backgroundColor: index === 0 ? 'rgb(255, 99, 132, 0.5)' : hashStringToColor(birthDate, 0.5), // : randomRGB(0.5), ,
        data: aggregateDataForKey,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
      };
    })
  );

  log('datasets %O', datasets);

  const matchesAndOpens = datasets.slice(0, 2);
  const messagesAndSwipes = datasets.slice(2);

  const conversionRates = useMemo(
    () =>
      profiles.map((p, index) => {
        try {
          const matches = datasets[0][0];
          const swipeLikes = datasets[2][0];

          return {
            key: 'conversionRate',
            label: getLabelForTinderProfile(p),
            borderColor: 'rgb(255, 99, 132)', //: randomRGB(), // 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132, 0.5)', // : randomRGB(0.5), ,
            data: matches.data.map((matchesPrMonth, i) => {
              const swipesPrMonth = swipeLikes.data[i];

              return {
                x: matchesPrMonth.x,
                y: swipesPrMonth.y ? matchesPrMonth.y / swipesPrMonth.y : 0,
              };
            }),
            cubicInterpolationMode: 'monotone',
            tension: 0.4,
          };
        } catch (error) {
          return undefined;
        }
      }),
    [profiles]
  );

  return (
    <AppLayout profile={me}>
      <Head>
        <title>Get insights about your dating data | Swipestats</title>
        <meta
          name="description"
          content={`Upload your dating data anonymously and compare it to demographics from around the world!`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={'https://swipestats.io/insights/'} />
        <meta property="og:title" content="Swipestats | Visualize your Tinder data" />
        <meta
          property="og:description"
          content="Upload your dating data anonymously and compare it to demographics from around the world!"
        />
        <meta property="og:image" content="/ss2.png" />
      </Head>
      <div className="pt-24 pb-6 container mx-auto">
        <h1 className="text-center text-6xl font-black">Insights</h1>
        <div className="md:flex md:items-center my-6">
          <div className="md:w-1/3 pt-2">
            <label
              className="block text-gray-500 md:text-right mb-1 md:mb-0 mr-4"
              htmlFor="inline-full-name"
            >
              Compare yourself with another Swipestats Id
            </label>
          </div>
          <div className="md:w-1/3 pt-2">
            <input
              id="inline-full-name"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-tinder"
              type="text"
            />
          </div>
          <div className="md:w-1/3 pt-2">
            <button
              className="shadow bg-rose-500 hover:bg-red-300 focus:shadow-outline focus:outline-none text-white  py-2 px-4 rounded md:ml-4"
              type="button"
            >
              Compare
            </button>
          </div>
        </div>
        {/* <Alert v-if="alert.display" :heading="alert.heading" :body="alert.info" /> */}
        {false && (
          <>
            <div className="block text-gray-500 text-center  mb-1 mt-2 md:mb-0">
              or a specific Demographic
            </div>
            <div className="md:flex md:items-center mx-6 justify-center">
              <button
                className="mt-2 shadow bg-rose-500 hover:bg-red-300 focus:shadow-outline focus:outline-none text-white  py-2 px-4 rounded md:ml-4"
                type="button"
                onClick={() =>
                  compareWithUser(
                    '96d5e7ba8f42af5f40b1ea25a3deafc035ebd5350521b925a5e6478e2aebfee5'
                  )
                }
              >
                Creator
              </button>
              <button
                className="mt-2 shadow bg-rose-500 hover:bg-red-300 focus:shadow-outline focus:outline-none text-white  py-2 px-4 rounded md:ml-4"
                type="button"
                onClick={() =>
                  compareWithUser(
                    '3f4b3a376a55ccbf7b57de1c1e19891ef36bd7ccdf370037e339d251ba5c85e9'
                  )
                }
              >
                Deepa
              </button>
              <button
                className="mt-2 shadow bg-rose-500 hover:bg-red-300 focus:shadow-outline focus:outline-none text-white  py-2 px-4 rounded md:ml-4"
                type="button"
              >
                Random
              </button>
              <button
                className="mt-2 shadow bg-rose-500 hover:bg-red-300 focus:shadow-outline focus:outline-none text-white  py-2 px-4 rounded md:ml-4"
                type="button"
              >
                Global average
              </button>
              <button
                className="mt-2 shadow bg-rose-500 hover:bg-red-300 focus:shadow-outline focus:outline-none text-white  py-2 px-4 rounded md:ml-4"
                type="button"
              >
                Men
              </button>
              <button
                className="mt-2 shadow bg-rose-500 hover:bg-red-300 focus:shadow-outline focus:outline-none text-white  py-2 px-4 rounded md:ml-4"
                type="button"
              >
                Women
              </button>
              <button
                className="mt-2 shadow bg-rose-500 hover:bg-red-300 focus:shadow-outline focus:outline-none text-white  py-2 px-4 rounded md:ml-4"
                type="button"
              >
                Country
              </button>
            </div>
          </>
        )}
      </div>
      {errors.length > 0 && (
        <Alert category="danger" title="Error" descriptionList={errors.map((e) => e.message)} />
      )}

      {/* {conversionRates.every(Boolean) && (
        <div className="w-full  h-auto">
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6 w-full h-96">
              <h2 className="leading-6  font-semibold tracking-wide ">{'Match rate'}</h2>

              <ResponsiveContainer>
                <LineChart
                  data={
                    conversionRates[0].data
                    // .map((cr) => cr?.data)
                  }
                >
                  <XAxis dataKey="x" />
                  <YAxis />
                  {conversionRates.map((cr, i) => (
                    <Line key={i} type="monotone" dataKey="y" stroke="#8884d8" />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )} */}

      {conversionRates.every(Boolean) && (
        <div className="w-full  h-auto">
          <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            {/* <CardHead title={chartTitle} /> */}
            <div className="px-4 py-5 sm:p-6">
              <h2 className="leading-6  font-semibold tracking-wide ">{'Match rate'}</h2>
              <Chart datasetIdKey="key" datasets={conversionRates} />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
        {matchesAndOpens.map((ds, i) => {
          const chartTitle = chartTitleMap[usageChartKeys[i]]; // usageChartKeys[i].split('_').join(' ');
          const totalN = ds[0]?.data.reduce((acc, cur) => acc + cur.y, 0);
          return (
            <div className="w-full " key={i}>
              <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between">
                    <h2 className="leading-6  font-semibold tracking-wide ">{chartTitle}</h2>
                  </div>
                  <span className="text-sm">Total: {totalN}</span>
                  <Chart datasetIdKey="key" datasets={ds} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {profiles.length ? <Stats profiles={profiles} /> : null}
      <RoastBanner />
      <div className="grid sm:grid-cols-2 gap-8 my-8">
        {messagesAndSwipes.map((ds, i) => {
          const chartTitle = chartTitleMap[usageChartKeys[i + 2]]; // usageChartKeys[i + 2].split('_').join(' ');
          const totalN = ds[0]?.data.reduce((acc, cur) => acc + cur.y, 0);

          return (
            <div className="w-full  h-auto" key={i}>
              <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                {/* <CardHead title={chartTitle} /> */}
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex justify-between">
                    <h2 className="leading-6  font-semibold tracking-wide ">{chartTitle}</h2>
                  </div>
                  <span className="text-sm">Total: {totalN}</span>
                  <Chart datasetIdKey="key" datasets={ds} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <DataRequestCTA />
    </AppLayout>
  );
}

function CardHead(props: { title: string }) {
  return (
    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
      <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{props.title}</h3>
        </div>
        {/* <div className="ml-4 mt-2 flex-shrink-0">
          <button
            type="button"
            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create new job
          </button>
        </div> */}
      </div>
    </div>
  );
}

const notify = (m: string) => {
  return toast.custom((t) => (
    <div
      id="toast-default"
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-rose-500 bg-blue-100 rounded-lg dark:bg-rose-800 dark:text-rose-200">
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="ml-3 text-sm font-normal">{m}</div>
      <button
        type="button"
        onClick={() => toast.dismiss(t.id)}
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-collapse-toggle="toast-default"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  ));
};
