import { AnonymizedTinderDataJSON, FullTinderDataJSON } from '../interfaces/TinderDataJSON';
import { SwipestatsProfile } from '../interfaces/SwipestatsProfile';
import { IsoDate } from '../interfaces/utilInterfaces';
import { ProviderId } from '../pages/upload/[provider]';
import { createSHA256Hash } from './cryptoUtils';
import debug, { logger } from './debug';
import { omitMultipleKeys } from './utils';
import { SwipestatsProfilePayload } from '../pages/api/profiles';
const log = logger(debug('data-extraction'));
// function getSecretIdOld(tinderData: FullTinderDataJSON) {
//     const secretId = md5(
//       tinderData.User.email +
//         tinderData.User.username +
//         tinderData.User.create_date
//     );

//     return secretId;
//   }

// should be pretty similar to database, except in database there is also the original (anonymized) json

async function createSwipestatsProfileId(birthDate: string, appProfileCreateDate: string) {
  // pretty unlikely collision IMO
  // can also be regenerated based on stored data
  const profileId = await createSHA256Hash(birthDate + '-' + appProfileCreateDate);
  log('Profile id created %s', profileId);
  return profileId;
}

export async function createSwipestatsProfilePayloadFromJson(
  jsonString: string,
  provider: ProviderId
): Promise<SwipestatsProfilePayload> {
  switch (provider) {
    case 'tinder':
      try {
        const tinderJson: FullTinderDataJSON = JSON.parse(jsonString);
        log('Tinder data parsed successfully');
        const anonymizedTinderJson: AnonymizedTinderDataJSON = {
          ...tinderJson,
          User: {
            ...omitMultipleKeys(tinderJson.User)(
              'email',
              'full_name',
              'name',
              'username',
              'phone_id'
            ),
            instagram: !!tinderJson.User.instagram,
            spotify: !!tinderJson.User.spotify?.spotify_connected,
          },
        };
        log('Tinder data anonymized successfully');

        const profileId = await createSwipestatsProfileId(
          anonymizedTinderJson.User.birth_date,
          anonymizedTinderJson.User.create_date
        );

        const swipestatsProfilePayload: SwipestatsProfilePayload = {
          tinderId: profileId,
          anonymizedTinderJson,
        };

        return swipestatsProfilePayload;
      } catch (error) {
        console.error('Tinder data extraction failed', error);
        throw new Error('Something went wrong with profile extraction');
      }

    default:
      throw new Error('Invalid provider');
  }
}
