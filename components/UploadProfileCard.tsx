import { TinderDataJSON } from '../interfaces/DataJSON';

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

  return (
    <div className="max-w-xs md:max-w-md rounded overflow-hidden shadow-lg bg-white hover:shadow-xl">
      {/* <div className="w-full flex justify-center">
      <img className="w-48 p-4" :src="imgSrc" alt="Sunset in the mountains" />
    </div> */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl">
          {`${userData.gender === 'M' ? 'Male' : 'Female'}`},
          {/* {getAgeFromBirthdate(userData.birth_date)} */}
          {userData.birth_date}
        </div>
        {userData.city && (
          <p className="text-gray-700 text-base">
            {userData.city.name}, {userData.city.region}, {travelLocationInfo[0].country.long_name}
          </p>
        )}

        <div>
          Looking for {userData.interested_in === 'F' ? 'women' : 'men'} ages
          {userData.age_filter_min}-{userData.age_filter_max}
        </div>
        <div>Education: {userData.education}</div>

        <div>Gender filter {userData.gender_filter}</div>
        <div>
          Account created: {new Date(userData.create_date).toLocaleDateString(navigator.language)}
        </div>

        <br />
        <p className="text-gray-700 text-base">This will be your unique id, don't lose it:</p>
        <h2
          className="text-xl font-bold"
          style={{
            overflowWrap: 'break-word',
          }}
        >
          {userId}
        </h2>

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
                  Don't share
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
                  Don't share
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
  );
}
