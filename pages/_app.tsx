import 'tailwindcss/tailwind.css';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { TrackingProvider } from '../components/providers/TrackingProvider';
import React, { useEffect } from 'react';
import debug, { logger } from '../lib/debug';
import { ApiProvider } from '../components/providers/ApiProvider';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
const log = logger(debug('app'));
// const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   // log('booting %s', 'Swipestats');
  //   setTimeout(() => {
  //     // throw new Error('Bugsnag test');
  //   }, 1000);
  // }, []);

  return (
    // <QueryClientProvider client={queryClient}>
    <TrackingProvider>
      <ApiProvider>
        <Component {...pageProps} />
        <Toaster />
      </ApiProvider>
    </TrackingProvider>
    // </QueryClientProvider>
  );
}

export default MyApp;

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  const debug = false;
  if (debug) {
    switch (metric.name) {
      case 'FCP':
        console.log('FCP: ', metric);
        break;
      case 'LCP':
        console.log('LCP: ', metric);
        break;
      case 'CLS':
        console.log('CLS: ', metric);
        break;
      case 'FID':
        console.log('FID: ', metric);
        break;
      case 'TTFB':
        console.log('TTFB: ', metric);
        break;
      case 'Next.js-hydration':
        console.log('Next.js-hydration: ', metric);
        break;
      case 'Next.js-route-change-to-render':
        console.log('Next.js-route-change-to-render: ', metric);
        break;
      case 'Next.js-render':
        console.log('Next.js-render: ', metric);
        break;
      default:
        break;
    }
  }
}
