import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/serverLib/prisma';
import { withSentry } from '@sentry/nextjs';
import { AnonymizedTinderDataJSON } from '../../../interfaces/TinderDataJSON';
import { SwipestatsProfile } from '../../../interfaces/SwipestatsProfile';
import { Prisma } from '@prisma/client';
import debug, { logger } from '../../../lib/debug';
const log = logger(debug('/profiles'));

// https://vercel.com/guides/nextjs-prisma-postgres

export interface SwipestatsProfilePayload {
  tinderId: string;
  anonymizedTinderJson: AnonymizedTinderDataJSON;
}

export type TinderProfilePrisma = Prisma.TinderProfileGetPayload<{
  include: {
    user: false;
  };
}>;

async function handler(req: NextApiRequest, res: NextApiResponse<TinderProfilePrisma>) {
  log(req.method || '');
  const gaClientId = req.headers['X-GA-CLIENT-ID'] as string;
  log(gaClientId || '');
  const tinderId = req.body.tinderId ?? req.query.tinderId;
  const existingTinderProfile = await prisma.tinderProfile.findUnique({
    where: {
      tinderId: tinderId,
    },
  });

  log('Existing profile found ' + !!existingTinderProfile);

  // const user = await prisma.user.findUnique()

  if (req.method === 'POST') {
    const body: SwipestatsProfilePayload = req.body;
    // validateBody(body)
    if (!body.anonymizedTinderJson) {
      throw new Error('No user provided');
    }

    if (!existingTinderProfile) {
      // only considers tinder data for now

      // const originalFile = prisma.originalAnonymizedFile.create({
      //   data: {
      //     dataProvider: 'TINDER',
      //     file: body.anonymizedTinderJson,
      //   },
      // });

      // const tinderProfile = body.swipestatsProfile.tinderProfile;
      const originalFile = body.anonymizedTinderJson;
      const usage = originalFile.Usage;
      log('Initiate prisma create');
      const result = await prisma.user.create({
        data: {
          // user: // is auto initialized
          tinderProfile: {
            create: {
              tinderId: tinderId,
              birthDate: originalFile.User.birth_date,
              createDate: originalFile.User.create_date,
              gender: originalFile.User.gender,
              bio: originalFile.User.bio,
              city: originalFile.User.city?.name,
              region: originalFile.User.city?.region,
              instagram: originalFile.User.instagram,
              spotify: originalFile.User.spotify,
              jobs: originalFile.User.jobs as unknown as Prisma.JsonArray,
              schools: originalFile.User.schools as unknown as Prisma.JsonArray,
              user_interests: originalFile.User.user_interests,
              sexual_orientations: originalFile.User.sexual_orientations, // Should probably be enum
              appOpens: usage.app_opens as Prisma.JsonObject,
              matches: usage.matches as Prisma.JsonObject,
              swipeLikes: usage.swipes_likes as Prisma.JsonObject,
              swipePasses: usage.swipes_passes as Prisma.JsonObject,
              messagesSent: usage.messages_sent as Prisma.JsonObject,
              messagesReceived: usage.messages_received as Prisma.JsonObject,
              messagesMeta: {
                messages: [] as Prisma.JsonArray,
              } as Prisma.JsonObject,
            },
          },
          dataFiles: {
            create: {
              dataProvider: 'TINDER',
              file: originalFile as unknown as Prisma.JsonObject,
            },
          },
        },
        include: {
          tinderProfile: true,
          dataFiles: true,
        },
      });

      if (!result.tinderProfile) {
        // throw new Error('404')
        res.status(404).end();
        return;
      }

      log('Created profile %s', result.tinderProfile.tinderId);
      log('Created profile %O', Object.keys(result.tinderProfile));
      res.status(200).json(result.tinderProfile);
    }

    if (!existingTinderProfile) {
      // throw new Error('404')
      res.status(404).end();
      return;
    }
    // TODO: Upsert
    // For now, just return existing
    log('Profile already exists, returning %s', existingTinderProfile.tinderId);
    res.status(200).json(existingTinderProfile);
  } else {
    // GET

    if (!existingTinderProfile) {
      // throw new Error('404')
      res.status(404).end();
      return;
    }

    res.status(200).json(existingTinderProfile);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default withSentry(handler);
