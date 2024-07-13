import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  response: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { query } = req.body;

  // Call your backend API here and get the response
  const backendRes = await fetch('http://127.0.0.1:8000/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const data = await backendRes.json();
  res.status(200).json({ response: data.response });
}