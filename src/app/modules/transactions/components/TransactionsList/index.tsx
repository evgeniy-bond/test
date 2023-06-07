import { Transaction } from '@ankr.com/ankr.js';

import styles from './TransactionsList.module.css';
import TransactionRow from '../Transaction';

interface TransactionsListProps {
  transactions?: Transaction[];
}

export default function TransactionsList({
  transactions,
}: TransactionsListProps) {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return <div>No Transactions for this address</div>;
  }

  return (
    <div className={styles.root}>
      {transactions.map(({ hash, value, timestamp, status, from, to, blockchain }) => {
        return (
          <div className={styles.row} key={hash}>
            <TransactionRow
              hash={hash}
              value={value}
              timestamp={timestamp}
              status={status}
              from={from}
              to={to}
              blockchain={blockchain}
            />
          </div>
        );
      })}
    </div>
  );
}
