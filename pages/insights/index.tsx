import { Chart } from '../../components/charts/Chart';
import { LineChart } from '../../components/charts/LineChart';
import KristianData from '../../fixtures/kristian-data.json';
import DeepaData from '../../fixtures/deepa-data.json';
import { DateValueMap, FullTinderDataJSON } from '../../interfaces/FullTinderDataJSON';

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

export default function InsightsPage() {
  // @ts-ignore
  const testData: FullTinderDataJSON = KristianData;
  const data = testData;
  const usageChartKeys = [
    'matches',
    'app_opens',
    'swipes_likes',
    'swipes_passes',
    'messages_sent',
    'messages_received',
  ] as const;

  const matches = testData.Usage.matches;

  const matchesDataset = {
    label: 'Kristian',
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    data: aggregateDataPrMonthForChart(matches),
  };

  const deepaDataset = {
    label: 'Deepa',
    data: aggregateDataPrMonthForChart(DeepaData.Usage.matches), //labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  };

  const datasets = usageChartKeys.map((key) => [
    {
      label: 'Kristian',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      data: aggregateDataPrMonthForChart(data.Usage[key]),
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="pt-24 container mx-auto">
        <h1 className="text-center text-6xl font-black">Insights</h1>
        <div className="md:flex md:items-center m-6">
          <div className="md:w-1/3 pt-2">
            <label
              className="block text-gray-500 md:text-right mb-1 md:mb-0 mr-4"
              htmlFor="inline-full-name"
            >
              Compare yourself with another Id
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
        <div className="md:flex md:items-center mx-6 justify-center">
          <label
            className="block text-gray-500  md:text-right mb-1 mt-2 md:mb-0"
            htmlFor="inline-full-name"
          >
            or a specific Demographic
          </label>

          <button
            className="mt-2 shadow bg-rose-500 hover:bg-red-300 focus:shadow-outline focus:outline-none text-white  py-2 px-4 rounded md:ml-4"
            type="button"
          >
            Creator
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
      </div>
      <div className="flex flex-wrap justify-around ">
        {datasets.map((ds, i) => {
          const chartTitle = usageChartKeys[i].split('_').join(' ');
          return (
            <div className="w-full sm:max-w-lg h-96" key={i}>
              <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  {/* Content goes here */}
                  {/* <LineChart title="test" datasets={[matchesDataset]} /> */}

                  <Chart title={chartTitle} datasets={ds} />

                  {/* <Chart title="App opens" datasets={[matchesDataset]} /> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
