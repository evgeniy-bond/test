import { useEffect } from 'react';

import { SupportedBlockchains } from '../constants';

export const useValidateBlockchain = (blockchain = '') => {
  useEffect(() => {
    const lowerCasedBlockchain = blockchain.toLowerCase();

    const isValid =
      lowerCasedBlockchain === SupportedBlockchains.ETH ||
      lowerCasedBlockchain === SupportedBlockchains.POLYGON;

    if (!isValid && blockchain) {
      throw new Error('Wrong blockchain');
    }
  }, [blockchain]);
};
