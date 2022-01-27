import { SplitbeeAnalytics } from '@splitbee/node';
import Mixpanel from 'mixpanel';
const MixpanelId = process.env.NEXT_PUBLIC_MIXPANEL_ID as string;

const mixpanelServer = Mixpanel.init(MixpanelId, {
  protocol: 'https',
  host: 'api-eu.mixpanel.com',
  secret: process.env.MIXPANEL_SECRET,
});

const splitbeeServer = new SplitbeeAnalytics(process.env.NEXT_PUBLIC_SPLITBEE_TOKEN as string);

export default mixpanelServer;

const measurement_id = process.env.NEXT_PUBLIC_GA4_ID;
const api_secret = process.env.GA4_API_SECRET;

// https://stackoverflow.com/questions/68773179/what-should-the-client-id-be-when-sending-events-to-google-analytics-4-using-the
// function ga4ServerTrack(
//   action: string,
//   userId: string | null,
//   clientId: string,
//   attributes: { [key: string]: any }
// ) {
//   fetch(
//     `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`,
//     {
//       method: 'POST',
//       body: JSON.stringify({
//         // client_id: 'XXXXXXXXXX.YYYYYYYYYY',
//         client_id: clientId,
//         user_id: userId,
//         events: [
//           {
//             name: action,
//             params: attributes,
//           },
//         ],
//       }),
//     }
//   );
// }

export function serverTrack(
  action: string,
  userId: string | null,
  attributes: {
    [key: string]: any;
  },
  clientId?: string
) {
  mixpanelServer.track(action, {
    userId,
    profileId: userId,
    ...attributes,
  });
  splitbeeServer.track({
    userId: userId || 'system',
    event: action,
    data: attributes,
  });
  // if (clientId) {
  //   ga4ServerTrack(action, userId, clientId, attributes);
  // }
}
