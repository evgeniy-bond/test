import Web3 from 'web3';
import BigNumber from 'bignumber.js';

const DECIMALS = 8;

export const formatValueToNumber = (value: string, decimals = DECIMALS) => {
  const parsedValue = Web3.utils.fromWei(value);

  return new BigNumber(parsedValue).toFixed(decimals);
};
