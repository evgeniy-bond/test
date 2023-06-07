import { useMemo } from 'react';

import ErrorBlock from '@/app/components/ErrorBlock';
import Loader from '@/app/components/Loader';
import { useValidateAddress } from '@/app/hooks/useValidateAddress';
import { useTransactions } from './hooks/useTransactions';
import TransactionsList from './components/TransactionsList';

interface TransactionsProps {
  addressId?: string;
}

export default function Transactions({ addressId }: TransactionsProps) {
  useValidateAddress(addressId);

  const { isLoading, error, data } = useTransactions(addressId);

  const content = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    }

    if (Boolean(error)) {
      return <ErrorBlock />;
    }

    return <TransactionsList transactions={data} />;
  }, [isLoading, error, data]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Address {addressId}</div>

      {content}
    </main>
  );
}
