import { Transaction } from '@ankr.com/ankr.js';
import BigNumber from 'bignumber.js';

export interface FormattedTransaction extends Transaction {
  timestampAsBigNumber: BigNumber;
  valueAsBigNumber: BigNumber;
}

export const formatData = (
  transactions?: Transaction[],
): FormattedTransaction[] => {
  if (!transactions) return [];

  return transactions?.map(item => ({
    ...item,
    timestampAsBigNumber: new BigNumber(item.timestamp),
    valueAsBigNumber: new BigNumber(item.value),
  }));
};
