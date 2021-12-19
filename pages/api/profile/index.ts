import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/serverLib/prisma';
// https://vercel.com/guides/nextjs-prisma-postgres

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (!req.body.id) {
    throw new Error('No id provided');
  }
  if (!req.body.user) {
    throw new Error('No user provided');
  }

  const { id, user } = req.body;
  // const result = await prisma.profile.create({
  //   data: {
  //     id: id,
  //     User: user,
  //   },
  // });
  res.status(200).json({ id });
}
