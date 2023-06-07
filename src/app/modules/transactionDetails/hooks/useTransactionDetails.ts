import { Blockchain, Transaction } from '@ankr.com/ankr.js';
import { useEffect, useState } from 'react';

import provider from '@/app/utils/provider';

const getDetails = (blockchain: Blockchain, txId: string) => {
  return provider.getTransactionsByHash({
    blockchain: [blockchain],
    transactionHash: txId,
  });
};

export const useTransactionDetails = (
  blockchain: Blockchain,
  txId?: string,
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<Transaction[]>();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(undefined);
      setData(undefined);

      try {
        const { transactions } = await getDetails(blockchain, txId);

        setData(transactions);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };

    if (txId) {
      getData();
    }
  }, [blockchain, txId]);

  return {
    isLoading,
    error,
    data,
  };
};
