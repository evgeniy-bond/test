import AddressBlock from '@/app/modules/transactions';
import ErrorBoundary from '@/app/components/ErrorBoundary';
import { useRouter } from 'next/router';

export default function Address() {
  const { query } = useRouter();

  const { addressId } = query;

  return (
    <ErrorBoundary>
      <AddressBlock addressId={addressId as string} />
    </ErrorBoundary>
  );
}
