import { useMemo } from 'react';

import ErrorBlock from '@/app/components/ErrorBlock';
import Loader from '@/app/components/Loader';
import { useValidateAddress } from '@/app/hooks/useValidateAddress';
import { useTransactions } from './hooks/useTransactions';
import TransactionsTable from './components/TransactionsTable';
import { formatData } from './utils';
import Balance from './components/Balance';

interface TransactionsProps {
  addressId?: string;
}

export default function Transactions({ addressId }: TransactionsProps) {
  useValidateAddress(addressId);

  const { isLoading, error, data } = useTransactions(addressId);
  const formattedData = useMemo(() => formatData(data), [data]);

  const content = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <ErrorBlock message={error.message} />;
    }

    return <TransactionsTable transactions={formattedData} />;
  }, [isLoading, error, formattedData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Balance addressId={addressId} />
      {content}
    </main>
  );
}
