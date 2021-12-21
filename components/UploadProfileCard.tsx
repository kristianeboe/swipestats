import { TinderDataJSON } from '../interfaces/DataJSON';
import Link from 'next/link';

function getAgeFromBirthdate(birthDate: Date, birthDateString?: string) {
  // const birthDate = new Date(birthDateString);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function UploadProfileCard({ dataJSON }: { dataJSON: TinderDataJSON }) {
  const userId = 'asdfasdfasdf';
  const userData = dataJSON.User;
  const travelLocationInfo = dataJSON.User.travel_location_info;

  <pre>{Object.keys(dataJSON).join(', ')}</pre>;
  const { Messages, Usage, ...json } = dataJSON;

  const debug = false;

  return (
    <>
      {debug && <pre>{Object.keys(json).join(', ')}</pre>}

      <div className="max-w-xs md:max-w-md rounded overflow-hidden shadow-lg bg-white hover:shadow-xl relative">
        {/* <div className="w-full flex justify-center">
      <img className="w-48 p-4" :src="imgSrc" alt="Sunset in the mountains" />
    </div> */}
        <div className=" group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
          <img
            src={
              'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'
            }
            alt=""
            className="object-cover pointer-events-none  h-40 w-full"
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl">
            {`${userData.gender === 'M' ? 'Male' : 'Female'}`}
          </div>
          {userData.city && (
            <p className="text-gray-700 text-base">
              {userData.city.name}, {userData.city.region},{' '}
              {travelLocationInfo[0].country.long_name}
            </p>
          )}
          <div>Age {getAgeFromBirthdate(new Date(userData.birth_date))}</div>

          <div>
            Looking for {userData.interested_in === 'F' ? 'women' : 'men'} ages{' '}
            {userData.age_filter_min}-{userData.age_filter_max}
          </div>
          {/* <div>Education: {userData.education}</div> */}

          {/* <div>Gender filter {userData.gender_filter}</div> */}
          <div>
            Account created: {new Date(userData.create_date).toLocaleDateString(navigator.language)}
          </div>

          <br />
          <p className="text-gray-700 text-base">
            This will be your unique id, don&apos;t lose it:
          </p>
          <div className="mt-5">
            <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:items-start">{userId}</div>
              <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
          {/* <h2
            className="text-xl font-bold"
            style={{
              overflowWrap: 'break-word',
            }}
          >
            {userId}
          </h2> */}

          {userData.jobs?.length && (
            <section className="mt-4">
              <h2 className="font-bold">Jobs data</h2>
              {userData.jobs.map((job) => (
                <div key={job.title.name}>
                  <button
                    type="button"
                    className="float-right bg-gray-500 rounded p-2"
                    // @click="removeKeyFromUserData('jobs')"
                  >
                    Don&apos;t share
                  </button>
                  <div>Title: {job.title.name}</div>
                  {/* <div>Show title: { job.titleDisplayed }</div>
          <div>Show company: { job.companyDisplayed }</div> */}
                </div>
              ))}
            </section>
          )}
          {userData.schools?.length && (
            <section className="mt-4">
              <h2 className="font-bold">School data</h2>
              {userData.schools.map((school) => (
                <div key={school.name}>
                  <button
                    type="button"
                    className="float-right bg-gray-500 rounded p-2"
                    // @click="removeKeyFromUserData('schools')"
                  >
                    Don&apos;t share
                  </button>
                  <div>School: {school.name}</div>
                  {/* <div>Show school: { school.displayed }</div> */}
                </div>
              ))}
            </section>
          )}
        </div>
        <div className="px-6 py-4">
          {userData.instagram && (
            <span className="inline-block bg-purple-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              #instagram
            </span>
          )}

          {userData.spotify && (
            <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              #spotify
            </span>
          )}
        </div>
      </div>

      {debug && (
        <div>
          <pre>{JSON.stringify(json, undefined, 2)}</pre>
          {/* <div>Usage test</div>
      <pre>{JSON.stringify(Usage, undefined, 2)}</pre>
      <div>Messages test</div>
      <pre>{JSON.stringify(Messages, undefined, 2)}</pre> */}
        </div>
      )}
    </>
  );
}
