import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import mixpanel, { track } from 'mixpanel-browser';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import splitbee from '@splitbee/web';
import { hotjar } from 'react-hotjar';

import { useStorage, useLocalStorage } from '../../lib/hooks/useStorage';
import { logger } from '../../lib/debug';
import debug from '../../lib/debug';
import { AnalyticsAction } from '../../interfaces/TrackingInterfaces';

// const log = logger('tracking');
const log = logger(debug('tracking'));

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL_ID;
const BUGSNAG_API_KEY = process.env.NEXT_PUBLIC_BUGSNAG_API_KEY;
const SPLITBEE_TOKEN = process.env.NEXT_PUBLIC_SPLITBEE_TOKEN;
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;

const DEBUG = false;

// intersection observer https://www.npmjs.com/package/react-intersection-observer

interface TrackingAttributes {
  [key: string]: string | number | any[];
}

export const ga4Event = (
  action: Gtag.EventNames | AnalyticsAction,
  {
    event_category,
    event_label,
    value,
    page_path,
    ...otherAttributes
  }: Gtag.EventParams & { page_path: string; [key: string]: any }
) => {
  window.gtag('event', action, {
    event_category,
    event_label,
    value,
    page_path,
    ...otherAttributes,
  });
};

interface AnalyticsSDK {
  [category: string]: {
    [action: string]: (attrs: { [key: string]: any }) => void;
  };
}

interface ITrackingContext {
  track: (action: AnalyticsAction, attributes: TrackingAttributes) => void;
  analyticsSDK: AnalyticsSDK;
}
const TrackingContext = React.createContext<ITrackingContext | null>(null);

export function TrackingProvider(props: { children: React.ReactNode }) {
  const router = useRouter();
  const [profileId] = useLocalStorage('SWIPESTATS_ID', '');
  // const [trackingInitialized, setTrackingInitialized] = useState(true);
  const [trackingAccepted, setTrackingAccepted] = useLocalStorage(
    'SWIPESTATS_ACCEPT_TRACKING',
    true
  );

  function initializeTracking() {
    log('initialize tracking %O', {
      ga4Id: GA4_ID,
      mixpanelId: MIXPANEL_ID,
      bugsnagApiKey: BUGSNAG_API_KEY,
      splitbeeToken: SPLITBEE_TOKEN,
      hotjarId: HOTJAR_ID,
    });
    // console.log('initialize analytics', {
    //   ga4Id: GA4_ID,
    //   mixpanelId: MIXPANEL_ID,
    //   bugsnagApiKey: BUGSNAG_API_KEY,
    //   splitbeeToken: SPLITBEE_TOKEN,
    //   hotjar: HOTJAR_ID
    // });

    if (MIXPANEL_ID) {
      mixpanel.init(MIXPANEL_ID, { debug: DEBUG, api_host: 'https://api-eu.mixpanel.com' });
    }
    if (SPLITBEE_TOKEN) {
      splitbee.init({
        token: SPLITBEE_TOKEN,
        // Enable cookie-less mode. Defaults to `false`
        disableCookie: true,
        scriptUrl: '/bee.js',
        apiUrl: '/_hive',
      });
    }
    if (BUGSNAG_API_KEY) {
      Bugsnag.start({
        appVersion: '0.1.0',
        apiKey: BUGSNAG_API_KEY,
        plugins: [new BugsnagPluginReact()],
        onError(event) {
          if (profileId) {
            event.setUser(profileId);
          }
          if (false) {
            event.addMetadata('company', {
              name: 'Acme Co.',
              country: 'uk',
            });
          }
        },
      });
    }
    if (HOTJAR_ID) {
      hotjar.initialize(parseInt(HOTJAR_ID), 6);
    }

    if (GA4_ID) {
      const sendPageView = true;
      gtag('config', GA4_ID, {
        send_page_view: sendPageView,
      });
      // if (sendPageView) {
      //   log('track', 'page_view', window.location.pathname);
      //   mixpanel.track('page_view');
      // }
    }
  }

  function identify() {
    if (DEBUG || !profileId) return;
    // GA set user_props
    if (profileId) {
      log('identify');
      if (MIXPANEL_ID) {
        mixpanel.identify(profileId);
      }
      if (SPLITBEE_TOKEN) {
        splitbee.user.set({
          profileId,
        });
      }
      if (hotjar.initialized()) {
        hotjar.identify(profileId, {});
      }
    }

    if (GA4_ID) {
      gtag('set', 'user_properties', {
        user_id: profileId,
      });
    }
  }

  function resetTracking() {
    if (MIXPANEL_ID) {
      mixpanel.reset();
    }
    if (GA4_ID) {
      gtag('set', 'user_properties', {
        user_id: '',
      });
    }
    if (SPLITBEE_TOKEN) {
      splitbee.reset();
    }
  }

  function pageview(path: string) {
    // log('pageview %s', path);
    if (DEBUG) return;
    track('page_view', {
      page_path: path,
    });
    // ga4Event('page_view', {
    //   page_path: path,
    // });
  }

  // initialize (goes first no matter what)
  useEffect(() => {
    if (trackingAccepted) {
      initializeTracking();
    } else {
      resetTracking();
    }
  }, [trackingAccepted]);

  useEffect(() => {
    identify();
  }, [profileId]);

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview);
    // no need for first pageview since google captures it
    // pageview(window.location.pathname); // first pageview

    return () => {
      router.events.off('routeChangeComplete', pageview);
    };
  }, [router.events]);

  function track(
    action: AnalyticsAction,
    attributes: TrackingAttributes,
    options = {
      mixpanel: true,
      ga4: true,
      splitbee: true,
    }
  ) {
    const attrs = {
      page_path: router.pathname,
      ...attributes,
    };
    log('track %s %O', action, attrs);
    if (DEBUG) return;
    // mixpane
    if (options.mixpanel && MIXPANEL_ID) mixpanel.track(action, attrs);
    if (options.ga4 && GA4_ID) ga4Event(action, attrs);

    if (action !== 'page_view') {
      if (options.splitbee && SPLITBEE_TOKEN) {
        splitbee.track(action, attrs);
      }
      if (HOTJAR_ID) {
        hotjar.event(action);
      }
    }
  }

  const analyticsSDK: AnalyticsSDK = {
    profile: {
      created: (attrs) =>
        track('Profile Created', {
          tinderId: attrs.tinderId,
        }),
    },
  };

  return (
    <TrackingContext.Provider
      value={{
        track,
        analyticsSDK,
      }}
      {...props}
    />
  );
}

export const useTracking = () => {
  const context = React.useContext(TrackingContext);
  if (context === null) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
