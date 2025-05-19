// src/pages/api/places.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { lat, lng, type } = req.body;

    if (!lat || !lng || !type) {
      res.status(400).json({ error: 'Missing parameters' });
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=${type}&key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      res.status(response.status).json({ error: 'Failed to fetch places' });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
