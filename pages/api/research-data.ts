// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { logModule } from '../../lib/debug';
import prisma from '../../lib/serverLib/prisma';
import { getRandomSubarray } from '../../lib/utils';
const logger = logModule('data-request');

type Data = any;

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      logger('New data request');
      //   Approve payment
      // Determine sample size
      // fetch sample
      // return sample
      const allProfiles = await prisma.tinderProfile.findMany({
        include: {
          messagesRaw: true,
        },
      });
      logger('Got %d profiles', allProfiles.length);
      const dataSample = getRandomSubarray(allProfiles, 10);
      logger('Sampled %d', dataSample.length);

      return res.status(200).json({
        profiles: dataSample,
        timestamp: Date.now(),
        n: dataSample.length,
      });
    default:
      return res.status(405).send('Method not supported');
  }
}

export default withSentry(handler);
