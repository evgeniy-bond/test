import { Balance, Transaction } from '@ankr.com/ankr.js';
import { useEffect, useState } from 'react';

import provider from '@/app/utils/provider';
import { SupportedBlockchains } from '@/app/constants';

const getBalance = (walletAddress: string) => {
  return provider.getAccountBalance({
    blockchain: [SupportedBlockchains.ETH, SupportedBlockchains.POLYGON],
    walletAddress,
  });
};

export const useBalance = (addressId?: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<Balance[]>();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(undefined);
      setData(undefined);

      try {
        const { assets } = await getBalance(addressId);

        setData(assets);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };

    if (addressId) {
      getData();
    }
  }, [addressId]);

  return {
    isLoading,
    error,
    data,
  };
};
