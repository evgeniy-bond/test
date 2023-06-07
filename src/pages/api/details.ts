import { NextApiRequest, NextApiResponse } from 'next';
import { Blockchain } from '@ankr.com/ankr.js';

import provider from '@/app/utils/provider';

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  const { blockchain, txId } = req.query;

  try {
    const response = await provider.getTransactionsByHash({
      blockchain: [blockchain as Blockchain],
      transactionHash: txId as string,
    });

    res.status(200).json(response);
  } catch (error: any) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
};

export default request;
