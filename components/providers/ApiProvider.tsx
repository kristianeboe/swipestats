import React, { useEffect, useState } from 'react';
import ky from 'ky';
import { SwipestatsProfilePayload, TinderProfilePrisma } from '../../pages/api/profiles';
import Cookies from 'js-cookie';

// interface IApiContext {
//     swipestatsSDK: {
//         profile: {
//             create: () => void
//         }
//     }
// }
type SwipestatsSDK = {
  profile: {
    create: (swipestatsProfilePayload: SwipestatsProfilePayload) => Promise<TinderProfilePrisma>;
  };
};

const ApiContext = React.createContext<SwipestatsSDK | null>(null);

export function ApiProvider(props: { children: React.ReactNode }) {
  return (
    <ApiContext.Provider
      value={{
        profile: {
          async create(swipestatsProfilePayload: SwipestatsProfilePayload) {
            return await ky
              .post('/api/profiles', {
                json: swipestatsProfilePayload,
                timeout: false,
              })
              .json<TinderProfilePrisma>();
          },
        },
      }}
      {...props}
    />
  );
}

export const useSwipestatsApi = () => {
  const context = React.useContext(ApiContext);
  if (context === null) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
