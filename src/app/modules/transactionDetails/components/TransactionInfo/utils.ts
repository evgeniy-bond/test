import { Transaction } from '@ankr.com/ankr.js';

import { SupportedBlockchains } from '@/app/constants';
import { formatTimestampToDate } from '@/app/utils/formatTimestampToDate';
import { formatValueToNumber } from '@/app/utils/formatValueToNumber';

export const getExplorerLink = (blockchain: string, transactionId = '') => {
  if (blockchain === SupportedBlockchains.ETH) {
    return `https://etherscan.io/tx/${transactionId}`;
  }

  return `https://polygonscan.com/tx/${transactionId}`;
};

const SUCCESS_STATUS = '0x1';

export const isSuccessStatus = (status: string) => {
  return status === SUCCESS_STATUS;
};

const GAS_DECIMALS = 18;

export const getRenderedValues = (
  transaction: Transaction,
  blockchain: string,
  txId?: string,
) => {
  const link = getExplorerLink(blockchain, txId);
  const { value, timestamp, status, gasUsed } = transaction;

  return {
    link,
    date: formatTimestampToDate(timestamp),
    value: formatValueToNumber(value),
    fee: gasUsed
      ? formatValueToNumber(gasUsed, GAS_DECIMALS)
      : 'no information',
    isSuccess: isSuccessStatus(status),
  };
};
