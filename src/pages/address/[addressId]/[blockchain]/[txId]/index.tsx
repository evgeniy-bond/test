import { useRouter } from 'next/router';

import ErrorBoundary from '@/app/components/ErrorBoundary';
import TransactionDetails from '@/app/modules/transactionDetails';
import { Blockchain } from '@ankr.com/ankr.js';

export default function Tx() {
  const { query } = useRouter();

  const { addressId, txId, blockchain } = query;

  return (
    <ErrorBoundary>
      <TransactionDetails
        addressId={addressId as string}
        txId={txId as string}
        blockchain={blockchain as Blockchain}
      />
    </ErrorBoundary>
  );
}
