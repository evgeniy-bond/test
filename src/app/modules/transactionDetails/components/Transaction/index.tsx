import { Transaction } from '@ankr.com/ankr.js';
import { useMemo } from 'react';

import styles from './Transaction.module.css';
import { getExplorerLink } from './utils';

interface TransactionsListProps {
  txId?: string;
  blockchain: string;
}

export default function Transaction({
  blockchain,
  txId,
}: TransactionsListProps) {
  const link = useMemo(
    () => getExplorerLink(blockchain, txId),
    [blockchain, txId],
  );

  return (
    <div className={styles.root}>
      <div>Transaction {txId}</div>
      <a href={link} target="_blank">
        tx details
      </a>
    </div>
  );
}
