import type { NextApiRequest, NextApiResponse } from 'next';

let feedbacks: { rating: number; feedback: string; createdAt: Date }[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { rating, feedback, createdAt } = req.body;
    feedbacks.push({ rating, feedback, createdAt });
    res.status(200).json({ message: 'Feedback submitted successfully' });
  } else if (req.method === 'GET') {
    res.status(200).json(feedbacks);
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}