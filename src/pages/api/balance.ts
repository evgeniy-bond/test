import { NextApiRequest, NextApiResponse } from 'next';

import { SupportedBlockchains } from '@/app/constants';
import provider from '@/app/utils/provider';

const request = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = req.query;

  try {
    const response = await provider.getAccountBalance({
      blockchain: [SupportedBlockchains.ETH, SupportedBlockchains.POLYGON],
      walletAddress: address as string,
    });

    res.status(200).json(response);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default request;
