export default function InsightsPage() {
  return (
    <div className="pt-24 container mx-auto">
      <h1 className="text-center text-6xl font-black">Insights</h1>
      <div className="md:flex md:items-center m-6">
        <div className="md:w-1/3 pt-2">
          <label
            className="block text-gray-500 md:text-right mb-1 md:mb-0 mr-4"
            for="inline-full-name"
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
  );
}
