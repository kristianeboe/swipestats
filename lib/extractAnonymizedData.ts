import { TinderDataJSON } from '../interfaces/DataJSON';
import { IsoDate } from '../interfaces/utilInterfaces';
import { ProviderId } from '../pages/upload/[provider]';
import { createSHA256Hash } from './cryptoUtils';
import debug, { logger } from './debug';
const log = logger(debug('data-extraction'));
// function getSecretIdOld(tinderData: TinderDataJSON) {
//     const secretId = md5(
//       tinderData.User.email +
//         tinderData.User.username +
//         tinderData.User.create_date
//     );

//     return secretId;
//   }

// should be pretty similar to database, except in database there is also the original (anonymized) json
interface SwipestatsProfile {
  id: string;
}

async function createSwipestatsProfileId(birthDate: string, appProfileCreateDate: string) {
  // pretty unlikely collision IMO
  // can also be regenerated based on stored data
  const profileId = await createSHA256Hash(birthDate + '-' + appProfileCreateDate);
  log('Profile id created %s', profileId);
  return profileId;
}

export async function createSwipestatsProfileFromJson(
  jsonString: string,
  provider: ProviderId
): Promise<SwipestatsProfile> {
  switch (provider) {
    case 'tinder':
      try {
        const tinderJson = JSON.parse(jsonString) as TinderDataJSON;
        log('Tinder data parsed successfully');

        const profileId = await createSwipestatsProfileId(
          tinderJson.User.birth_date,
          tinderJson.User.create_date
        );

        return { id: profileId };
      } catch (error) {
        console.error('Tinder data extraction failed', error);
        throw new Error('Something went wrong with profile extraction');
      }

    default:
      throw new Error('Invalid provider');
  }
}
