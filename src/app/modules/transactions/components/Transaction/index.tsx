import { Transaction } from '@ankr.com/ankr.js';

import styles from './Transaction.module.css';
import { formatTimestampToDate } from '@/app/utils/formatTimestampToDate';
import Link from 'next/link';
import { useMemo } from 'react';

import { getDetailsLink } from './utils';

interface TransactionsListProps {
  hash?: string;
  value: string;
  timestamp: string;
  status: string;
  to?: string;
  from: string;
  blockchain: string; 
}

export default function Transaction({
  hash,
  value,
  timestamp,
  status,
  to,
  from,
  blockchain
}: TransactionsListProps) {
  const detailsLink = useMemo(
    () => getDetailsLink({ from, blockchain, hash }),
    [from, blockchain, hash],
  );

  return (
    <div className={styles.root}>
      <div>{hash}</div>
      <div>{from}</div>
      <div>{to}</div>
      <div>{value}</div>
      <div>{formatTimestampToDate(timestamp)}</div>
      <div>{status}</div>
      <Link href={detailsLink}>tx details</Link>
    </div>
  );
}
