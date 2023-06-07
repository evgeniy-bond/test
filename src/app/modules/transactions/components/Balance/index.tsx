import { useMemo } from 'react';

import ErrorBlock from '@/app/components/ErrorBlock';
import Loader from '@/app/components/Loader';
import { useValidateAddress } from '@/app/hooks/useValidateAddress';
import { useBalance } from './hooks/useBalance';
import BalancesList from './components/BalancesList';
import styles from './Balance.module.css';

interface BalanceProps {
  addressId?: string;
}

export default function Balance({ addressId }: BalanceProps) {
  useValidateAddress(addressId);

  const { isLoading, error, data } = useBalance(addressId);

  const content = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <ErrorBlock message={error?.message} />;
    }

    if (!data) {
      return <>No balances info</>
    }

    return <BalancesList balances={data} />;

  }, [isLoading, error, data]);

  return (
    <div>
      <div className={styles.address}>Address {addressId}</div>
      {content}
    </div>
  );
}
