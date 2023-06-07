import { GetTransactionsByAddressReply, Transaction } from '@ankr.com/ankr.js';
import { useEffect, useState } from 'react';

import http from '@/app/utils/http';

const getTransactions = async (address = '') => {
  const { data } = await http.get<GetTransactionsByAddressReply>(
    '/api/transactions',
    {
      params: { address },
    },
  );

  return data;
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
