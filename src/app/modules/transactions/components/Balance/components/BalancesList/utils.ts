import { Balance } from '@ankr.com/ankr.js';

import { SupportedBlockchains } from '@/app/constants';

export const getSupportedBalances = (balances: Balance[]) => {
  return balances.filter(item => {
    const lowerCasedSymbol = item.tokenSymbol.toLowerCase();

    return (
      lowerCasedSymbol === SupportedBlockchains.ETH ||
      lowerCasedSymbol === SupportedBlockchains.POLYGON
    );
  });
};
