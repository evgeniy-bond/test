import { Balance, GetAccountBalanceReply } from '@ankr.com/ankr.js';
import { useEffect, useState } from 'react';

import http from '@/app/utils/http';

const getBalance = async (address = '') => {
  const { data } = await http.get<GetAccountBalanceReply>('/api/balance', {
    params: { address },
  });

  return data;
};

export const useBalance = (addressId?: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error>();
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
