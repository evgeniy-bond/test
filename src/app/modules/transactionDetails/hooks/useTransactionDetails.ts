import { Blockchain, Transaction } from '@ankr.com/ankr.js';
import { useEffect, useState } from 'react';

import provider from '@/app/utils/provider';

const getDetails = (blockchain: Blockchain, txId: string) => {
  return provider.getTransactionsByHash({
    blockchain: [blockchain],
    transactionHash: txId,
  });
};

export const ETH_BLOCK_TIME = 10_000;

export const timeout = (ms: number) => new Promise(res => setTimeout(res, ms));

const waitForTransaction = async (blockchain: Blockchain, txId: string) => {
  let attempts = 5;

  while (attempts > 0) {
    const { transactions } = await getDetails(blockchain, txId);

    if (transactions?.[0]) {
      return transactions?.[0];
    }

    attempts -= 1;

    if (attempts === 0) {
      throw new Error('No such transaction');
    }

    await timeout(ETH_BLOCK_TIME);
  }
};

export const useTransactionDetails = (blockchain: Blockchain, txId = '') => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<Transaction | undefined>();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      setError(undefined);
      setData(undefined);

      try {
        const transaction = await waitForTransaction(blockchain, txId);

        setData(transaction);
      } catch (error) {
        setError(error as Error);
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
