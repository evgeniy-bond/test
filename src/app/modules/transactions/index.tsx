import { useMemo } from 'react';

import ErrorBlock from '@/app/components/ErrorBlock';
import Loader from '@/app/components/Loader';
import { useValidateAddress } from '@/app/hooks/useValidateAddress';
import { useTransactions } from './hooks/useTransactions';
import TransactionsTable from './components/TransactionsTable';
import { formatData } from './utils';
import Balance from './components/Balance';
import styles from './Transactions.module.css';

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
    <main className={`p-10 max-w-7xl ${styles.main}`}>
      <Balance addressId={addressId} />
      {content}
    </main>
  );
}
