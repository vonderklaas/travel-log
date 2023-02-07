import type { NextApiRequest, NextApiResponse } from 'next';

import { TravelLogs } from '@/models/TravelLogs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const logs = TravelLogs.find().toArray();
  res.status(200).json(logs);
}
