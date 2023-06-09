import { Blockchain } from '@ankr.com/ankr.js';
import { useMemo } from 'react';

import { useTransactionDetails } from './hooks/useTransactionDetails';
import TransactionInfo from './components/TransactionInfo';
import { useValidateAddress } from '@/app/hooks/useValidateAddress';
import { useValidateBlockchain } from '@/app/hooks/useValidateBlockchain';
import ErrorBlock from '@/app/components/ErrorBlock';
import Loader from '@/app/components/Loader';
import Balance from '../transactions/components/Balance';

interface TransactionDetailsProps {
  addressId?: string;
  txId?: string;
  blockchain: Blockchain;
}

export default function TransactionDetails({
  addressId,
  txId,
  blockchain,
}: TransactionDetailsProps) {
  useValidateAddress(addressId);
  useValidateBlockchain(blockchain);

  const { isLoading, error, data } = useTransactionDetails(blockchain, txId);

  const content = useMemo(() => {
    if (isLoading) {
      return <Loader />;
    }

    if (error) {
      return <ErrorBlock message={error?.message} />;
    }

    if (data) {
      return (
        <TransactionInfo
          txId={txId}
          blockchain={blockchain}
          transaction={data}
        />
      );
    }
  }, [isLoading, data, error, blockchain, txId]);

  return (
    <main className="p-10 max-w-7xl">
      <Balance addressId={addressId} />
      {content}
    </main>
  );
}
