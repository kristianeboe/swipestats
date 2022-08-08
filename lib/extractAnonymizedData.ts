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

function isValidTinderJson(tinderJson: FullTinderDataJSON) {
  const errors: {
    [key: string]: { message: string; [key: string]: any };
  } = {};
  if (!Object.values(tinderJson.Usage.app_opens).length) {
    errors.app_opens = {
      message: 'No app opens detected',
      appOpens: tinderJson.Usage.app_opens,
    };
  }
  if (!tinderJson.User.create_date) {
    errors.user_create_date = {
      message: 'No create_date detected',
      user: tinderJson.User,
    };
  }

  if (Object.keys(errors).length === 0) {
    return [true, {}];
  } else {
    return [false, errors];
  }
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

        const birthDate = tinderJson.User.birth_date;
        const createDate = tinderJson.User.create_date;

        const [jsonDataIsValid, invalidKeysAndValues] = isValidTinderJson(tinderJson);

        if (!jsonDataIsValid) {
          console.error('Tinder data is invalid', invalidKeysAndValues);
          throw new Error('Tinder data json is invalid');
        }

        const anonymizedTinderJson: AnonymizedTinderDataJSON = {
          // including messages
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
