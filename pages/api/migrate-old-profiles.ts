// A file to host the original migration script from Swipestats 1.0 MongoDB to Swipestats 2.0 Prisma + postgres db

import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { OLD_MONGO_Profile } from '../../interfaces/SwipestatsProfile';
import { createSHA256Hash } from '../../lib/cryptoUtils';
import debug, { logger } from '../../lib/debug';
import { TinderProfilePrisma } from './profiles';
const log = logger(debug('/migration'));

// import JSON_Profiles from '../../old_swipestats_profiles/old_profiles.json';
import JSON_Profiles from '../../old_swipestats_profiles/female.json';

const sleep = (duration: number) =>
  new Promise((resolve) => setTimeout(() => resolve(null), duration));

async function createSwipestatsProfileId(birthDate: string, appProfileCreateDate: string) {
  // pretty unlikely collision IMO
  // can also be regenerated based on stored data
  const profileId = await createSHA256Hash(birthDate + '-' + appProfileCreateDate);
  log('Profile id created %s', profileId);
  return profileId;
}

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  log(req.method || '');

  log('Starting parsing...');
  // const profiles = JSON.parse(JSON_Profiles) as OLD_MONGO_Profile[];
  const profiles = JSON_Profiles as OLD_MONGO_Profile[];

  const usersSoFar = [];

  log('Starting import of profiles: ' + profiles.length);
  for (const profile of profiles) {
    const newTinderId = await createSwipestatsProfileId(
      profile.user.birthDate,
      profile.user.createDate
    );

    try {
      const createObj: Prisma.UserCreateInput = {
        tinderProfile: {
          create: {
            tinderId: newTinderId,
            birthDate: profile.user.birthDate,
            createDate: profile.user.createDate,
            gender: profile.user.gender,
            // bio: originalFile.User.bio,
            city: profile.user.cityName,
            region: profile.user.country,
            instagram: profile.user.instagram,
            spotify: profile.user.spotify,
            jobs: profile.user.jobs as unknown as Prisma.JsonArray,
            schools: profile.user.schools as unknown as Prisma.JsonArray,
            // user_interests: originalFile.User.user_interests,
            // sexual_orientations: originalFile.User.sexual_orientations, // Should probably be enum
            appOpens: profile.appOpens as Prisma.JsonObject,
            matches: profile.matches as Prisma.JsonObject,
            swipeLikes: profile.swipeLikes as Prisma.JsonObject,
            swipePasses: profile.swipePasses as Prisma.JsonObject,
            messagesSent: profile.messagesSent as Prisma.JsonObject,
            messagesReceived: profile.messagesReceived as Prisma.JsonObject,
            //           conversationsMeta: {
            //   nrOfConversations: number; //739
            //   longestConversation: number; // 133
            //   longestConversationInDays: number; // 683.5574421296296
            //   averageConversationLength: number; // 8.56021650879567
            //   averageConversationLengthInDays: number; // 10.236619931839824
            //   medianConversationLength: number; // 3
            //   medianConversationLengthInDays: number; // 0.08113425925925925
            //   nrOfOneMessageConversations: number; // 226
            //   percentOfOneMessageConversations: number; // 30.581867388362653
            //   nrOfGhostingsAfterInitialMessage: number; // 66
            // };
            messages: {
              create: {
                id: newTinderId,
                messages: profile.conversations as Prisma.JsonArray,
              },
            },
            messagesMeta: {
              messages: profile.conversations as Prisma.JsonArray,
            } as Prisma.JsonObject,
          },
        },
        ogSwipestatsProfile: profile as unknown as Prisma.JsonObject,
      };

      usersSoFar.push(profile._id);

      log('Created tinder profile ' + createObj.tinderProfile?.create?.birthDate, {
        tId: createObj.tinderProfile?.create?.tinderId,
        gender: createObj.tinderProfile?.create?.gender,
      });
      await sleep(1000);
    } catch (error) {
      res.status(500).json({
        usersSoFar,
        usersSoFarN: usersSoFar.length,
      });
    }

    // const result = await prisma.user.create({
    //   data: {
    //     // user: // is auto initialized
    //     tinderProfile: {
    //       create: {
    //         tinderId: tinderId,
    //         birthDate: originalFile.User.birth_date,
    //         createDate: originalFile.User.create_date,
    //         gender: originalFile.User.gender,
    //         bio: originalFile.User.bio,
    //         city: originalFile.User.city?.name,
    //         region: originalFile.User.city?.region,
    //         instagram: originalFile.User.instagram,
    //         spotify: originalFile.User.spotify,
    //         jobs: originalFile.User.jobs as unknown as Prisma.JsonArray,
    //         schools: originalFile.User.schools as unknown as Prisma.JsonArray,
    //         user_interests: originalFile.User.user_interests,
    //         sexual_orientations: originalFile.User.sexual_orientations, // Should probably be enum
    //         appOpens: usage.app_opens as Prisma.JsonObject,
    //         matches: usage.matches as Prisma.JsonObject,
    //         swipeLikes: usage.swipes_likes as Prisma.JsonObject,
    //         swipePasses: usage.swipes_passes as Prisma.JsonObject,
    //         messagesSent: usage.messages_sent as Prisma.JsonObject,
    //         messagesReceived: usage.messages_received as Prisma.JsonObject,
    //         messagesMeta: {
    //           messages: [] as Prisma.JsonArray,
    //         } as Prisma.JsonObject,
    //       },
    //     },
    //     dataFiles: {
    //       create: {
    //         dataProvider: 'TINDER',
    //         file: originalFile as unknown as Prisma.JsonObject,
    //       },
    //     },
    //   },
    //   include: {
    //     tinderProfile: true,
    //   },
    // });
  }

  res.status(200).json({
    profilesN: profiles.length,
    usersSoFar,
    usersSoFarN: usersSoFar.length,
  });
}

export default handler;
