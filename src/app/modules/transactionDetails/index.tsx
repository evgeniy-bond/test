import { Blockchain } from '@ankr.com/ankr.js';
import { useMemo } from 'react';

import { useTransactionDetails } from './hooks/useTransactionDetails';
import Transaction from './components/Transaction';
import { useValidateAddress } from '@/app/hooks/useValidateAddress';
import { useValidateBlockchain } from '@/app/hooks/useValidateBlockchain';
import ErrorBlock from '@/app/components/ErrorBlock';
import Loader from '@/app/components/Loader';

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
    const transaction = data?.[0];

    if (isLoading) {
      return <Loader />;
    }

    if (Boolean(error)) {
      return <ErrorBlock />;
    }

    if (!transaction) {
      return <div>No such transaction</div>;
    }

    return <Transaction txId={txId} blockchain={blockchain} />;
  }, [isLoading, data, error, blockchain, txId]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Address {addressId}</div>
      {content}
    </main>
  );
}
