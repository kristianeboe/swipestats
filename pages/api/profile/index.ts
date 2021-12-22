import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/serverLib/prisma';
import { withSentry } from '@sentry/nextjs';

// https://vercel.com/guides/nextjs-prisma-postgres

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (!req.body.id) {
    throw new Error('No id provided');
  }

  if (req.method === 'POST') {
    if (!req.body.profile) {
      throw new Error('No user provided');
    }
    const result = await prisma.profile.create({
      data: {
        tinderId: req.body.id,
      },
    });
  } else {
    // GET
    const result = await prisma.profile.findUnique({
      where: {
        id: req.body.id,
      },
    });

    const { id, user } = req.body;
    res.status(200).json({ id });
  }
}

export default withSentry(handler);
