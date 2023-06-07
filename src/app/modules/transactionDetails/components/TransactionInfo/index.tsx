import { Transaction } from '@ankr.com/ankr.js';
import { useMemo } from 'react';

import styles from './Transaction.module.css';
import { getRenderedValues } from './utils';

interface TransactionInfoProps {
  txId?: string;
  blockchain: string;
  transaction: Transaction;
}

export default function TransactionInfo({
  blockchain,
  txId,
  transaction,
}: TransactionInfoProps) {
  const { link, date, fee, isSuccess, value } = useMemo(
    () => getRenderedValues(transaction, blockchain, txId),
    [transaction, blockchain, txId],
  );

  return (
    <div className={styles.root}>
      <div className={styles.transaction}>Transaction {txId}</div>

      <div className={styles.info}>
        <div style={{ color: isSuccess ? 'green' : 'red' }}>
          status: {isSuccess ? 'success' : 'failed'}
        </div>
        <div>value: {value}</div>
        <div>date: {date}</div>
        <div>fee: {fee}</div>
        <a href={link} target="_blank" className={styles.link}>
          Go to explorer
        </a>
      </div>
    </div>
  );
}
