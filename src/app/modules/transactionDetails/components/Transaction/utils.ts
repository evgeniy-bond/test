import { SupportedBlockchains } from '@/app/constants';

export const getExplorerLink = (blockchain: string, transactionId = '') => {
  if (blockchain === SupportedBlockchains.ETH) {
    return `https://etherscan.io/tx/${transactionId}`;
  }

  return `https://polygonscan.com/tx/${transactionId}`;
};
