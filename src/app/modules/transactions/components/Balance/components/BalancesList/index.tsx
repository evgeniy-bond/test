import { Balance } from '@ankr.com/ankr.js';
import { useMemo } from 'react';

import styles from './BalancesList.module.css';
import { getSupportedBalances } from './utils';

interface BalancesListProps {
  balances: Balance[];
}

export default function BalancesList({ balances }: BalancesListProps) {
  const supportedBalances = useMemo(
    () => getSupportedBalances(balances),
    [balances],
  );

  return (
    <div className={styles.root}>
      {supportedBalances.map(({ balance, tokenName }, index) => {
        return (
          <div key={index} className={styles.row}>
            <div className={styles.tokenName}>{tokenName}</div>
            <div>{balance}</div>
          </div>
        );
      })}
    </div>
  );
}
