import { Transaction } from '@ankr.com/ankr.js';
import { useEffect, useState } from 'react';

import provider from '@/app/utils/provider';
import { SupportedBlockchains } from '@/app/constants';

const getTransactions = (walletAddress: string) => {
  return provider.getTransactionsByAddress({
    blockchain: [SupportedBlockchains.ETH, SupportedBlockchains.POLYGON],
    address: [walletAddress],
  });
};

export const useTransactions = (addressId?: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<Transaction[]>();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(undefined);
      setData(undefined);

      try {
        const { transactions } = await getTransactions(addressId);

        setData(transactions);
      } catch (error) {
        setError(error as Error);
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
