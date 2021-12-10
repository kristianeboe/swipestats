// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

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

    const result = await prisma.waitlist.create({
      data: {
        email,
        dataProvider,
      },
    });
    console.log('prisma res', result);

    res.status(200).json({ email, dataProvider, date: new Date() });
  }
}
