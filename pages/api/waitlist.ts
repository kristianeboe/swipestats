// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/serverLib/prisma';
import { Prisma } from '@prisma/client';
type Data = {
  email: string;
  dataProvider: string;
  date: Date;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    if (!req.body.email) {
      throw new Error('No email provided');
    }
    if (!req.body.dataProvider) {
      throw new Error('No data provider provided');
    }

    const email = req.body.email;
    const dataProvider = req.body.dataProvider;

    await prisma.waitlist
      .create({
        data: {
          email,
          dataProvider: dataProvider.toUpperCase(),
        },
      })
      .then((result) => {
        console.log('prisma res', result);
        res.status(200).json({ email, dataProvider, date: new Date() });
      })
      .catch((e) => {
        // res.status(500).json({ email, dataProvider, date: new Date(), e });
        throw new Error(e);
      });
  }
}
