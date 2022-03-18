// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { logModule } from '../../lib/debug';
// const logger = l('hello');
const logger = logModule('hello');
type Data = {
  name: string;
  date: Date;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const returnData = { name: 'John Doe', date: new Date() };
  logger('Hi there, this is a log test %o', returnData);
  res.status(200).json(returnData);
}
