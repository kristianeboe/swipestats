import { TinderProfile } from '@prisma/client';
import ky from 'ky';

export async function fetchProfiles(profileIds: string[]) {
  const id = profileIds[0];
  return ky
    .get('/api/profiles', {
      searchParams: {
        // id: profileIds.join(','),
        tinderId: id,
      },
    })
    .json<TinderProfile>();
  // .then((tp) => {
  //   if (tp) {
  //     setProfiles([tp]);
  //     notify('Fetched profile for ' + getLabelForTinderProfile(tp));
  //   } else {
  //     notify('No profile found');
  //   }
  // })
  // .catch((e) => {
  //   setErrors([e]);
  //   notify('Fetch failed');
  // })
}
