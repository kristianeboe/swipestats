import Link from 'next/link';
import { FullTinderDataJSON } from '../interfaces/TinderDataJSON';
import { getAgeFromBirthdate } from '../lib/utils';
import { SwipestatsProfilePayload } from '../pages/api/profiles';

export function UploadProfileCard({
  dataJSON,
  swipestatsProfilePayload,
}: {
  dataJSON: FullTinderDataJSON;
  swipestatsProfilePayload: SwipestatsProfilePayload;
}) {
  const userId = swipestatsProfilePayload.tinderId;
  const userData = swipestatsProfilePayload.anonymizedTinderJson.User;
  const travelLocationInfo = userData.travel_location_info;

  <pre>{Object.keys(dataJSON).join(', ')}</pre>;
  const { Messages, Usage, ...json } = dataJSON;

  const isMale = userData.gender === 'M';
  const debug = false;

  return (
    <>
      {debug && <pre>{Object.keys(json).join(', ')}</pre>}

      <div className="max-w-xs md:max-w-xl rounded overflow-hidden shadow-lg bg-white relative">
        {/* <div className="w-full flex justify-center">
      <img className="w-48 p-4" :src="imgSrc" alt="Sunset in the mountains" />
    </div> */}
        <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
          <img
            src={
              isMale
                ? '/images/svgs/undraw_male_avatar.svg' //  require('/assets/imgs/undraw_male_avatar.svg') //  '/assets/imgs/undraw_male_avatar.svg'
                : '/images/svgs/undraw_female_avatar.svg' // require('/assets/imgs/undraw_female_avatar.svg') // '/assets/imgs/undraw_female_avatar.svg' //  'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80'
            }
            alt=""
            className="object-cover pointer-events-none  h-40 w-full px-40 "
          />
        </div>
        <div className="px-6 py-4">
          <div className="flex items-baseline">
            <div className="font-bold text-xl">
              {`${isMale ? 'Male' : 'Female'}, ${getAgeFromBirthdate(
                new Date(userData.birth_date)
              )}`}
            </div>
          </div>
          {userData.city && (
            <p className="text-gray-700 text-base">
              {userData.city.name}, {userData.city.region},{' '}
              {travelLocationInfo[0].country.long_name}
            </p>
          )}

          <p className="text-gray-700 text-base">
            Looking for {userData.interested_in === 'F' ? 'women' : 'men'} ages{' '}
            {userData.age_filter_min}-{userData.age_filter_max}
          </p>
          {/* <div>Education: {userData.education}</div> */}

          {/* <div>Gender filter {userData.gender_filter}</div> */}
          <p className="text-gray-700 text-base">
            Account created: {new Date(userData.create_date).toLocaleDateString(navigator.language)}
          </p>

          <br />
          <p className="text-gray-700 text-base">
            Your unique id. Save it, or find it by uploading your file again.
          </p>
          <div className="mt-5">
            <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:items-start font-mono text-xs overflow-x-scroll md:overflow-auto ">
                {userId}
              </div>
              <div className="mt-4 sm:mt-0 sm:-ml-6 sm:flex-shrink-0 hidden  hover:block ">
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
                  {false && (
                    <button
                      type="button"
                      className="float-right bg-gray-500 rounded p-2"
                      // @click="removeKeyFromUserData('jobs')"
                    >
                      Don&apos;t share
                    </button>
                  )}

                  <div>
                    {job.title.name} {job.company.displayed ? '@ ' + job.company.name : ''}{' '}
                  </div>
                </div>
              ))}
            </section>
          )}
          {userData.schools?.length && (
            <section className="mt-4">
              <h2 className="font-bold">School data</h2>
              {userData.schools.map((school) => (
                <div key={school.name}>
                  {false && (
                    <button
                      type="button"
                      className="float-right bg-gray-500 rounded p-2"
                      // @click="removeKeyFromUserData('schools')"
                    >
                      Don&apos;t share
                    </button>
                  )}

                  <div>School: {school.name}</div>
                  {/* <div>Show school: { school.displayed }</div> */}
                </div>
              ))}
            </section>
          )}
        </div>
        {userData?.user_interests?.length && (
          <div className="px-6 py-4">
            <h2 className="font-bold">Interests</h2>
            {userData?.user_interests?.map((interest: string) => (
              <span
                key={interest}
                className="inline-block bg-purple-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {interest}
              </span>
            ))}
          </div>
        )}

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
