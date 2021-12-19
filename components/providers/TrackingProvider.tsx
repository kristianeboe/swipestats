import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import mixpanel, { track } from 'mixpanel-browser';
import useStorage from '../../lib/hooks/useStorage';

export const GA4Id = process.env.NEXT_PUBLIC_GA4_ID;
const MixpanelId = process.env.NEXT_PUBLIC_MIXPANEL_ID;
const DEBUG = true;

type ViewAction = 'View email reminder';
type AnalyticsAction = 'Submit email reminder' | ViewAction;
// intersection observer https://www.npmjs.com/package/react-intersection-observer

interface TrackingAttributes {
  [key: string]: string | number | any[];
}

// TOOD: Type this < interface | null>
interface ITrackingContext {
  track: (action: AnalyticsAction, attributes: TrackingAttributes) => void;
}
const TrackingContext = React.createContext<ITrackingContext | null>(null);

function identify(profileId: string) {
  console.log('identify');
  if (DEBUG || !profileId) return;
  // GA set user_props
  mixpanel.identify(profileId);
  gtag('set', {
    user_id: profileId,
  });
}

function pageview(path: string) {
  console.log('pageview', path);
  if (DEBUG) return;
  track('page_view', {
    page_path: path,
  });
  // ga4Event('page_view', {
  //   page_path: path,
  // });
}

function initializeTracking(profileId: string) {
  console.log('initialize tracking', {
    profileId,
    ga4Id: GA4Id,
    mixpanelId: MixpanelId,
  });

  if (DEBUG) return;

  if (GA4Id) {
    gtag('config', GA4Id, {
      send_page_view: false,
    });
  }
  if (MixpanelId) {
    mixpanel.init(MixpanelId, { debug: DEBUG });
  }
  identify(profileId);
}

export const ga4Event = (
  action: Gtag.EventNames,
  { event_category, event_label, value, page_path }: Gtag.EventParams & { page_path: string }
) => {
  window.gtag('event', action, {
    event_category,
    event_label,
    value,
    page_path,
  });
};

function TrackingProvider(props: { children: React.ReactNode }) {
  const router = useRouter();
  const { getItem } = useStorage();
  const profileId = getItem('SWIPESTATS_ID');

  // initialize
  useEffect(() => {
    initializeTracking(profileId);
    pageview(window.location.pathname);
    // identify
    // localhost?
  }, []);

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview);

    return () => {
      router.events.off('routeChangeComplete', pageview);
    };
  }, [router.events]);

  function track(action: AnalyticsAction, attributes: TrackingAttributes) {
    console.log('track', action, attributes);
    if (DEBUG) return;
    // mixpane
    mixpanel.track(action, attributes);
    // ga4
  }

  return (
    <TrackingContext.Provider
      value={{
        track,
      }}
      {...props}
    />
  );
}

const useTracking = () => {
  const context = React.useContext(TrackingContext);
  if (context === null) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export { TrackingProvider, useTracking };
