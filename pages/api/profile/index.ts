import prisma from '../../../lib/prisma';
// https://vercel.com/guides/nextjs-prisma-postgres

export default async function handler(req, res) {
  const { id, user } = req.body;
  const result = await prisma.profile.create({
    data: {
      id: id,
      User: user,
    },
  });
  res.status(200).json({ name: 'John Doe' });
}
