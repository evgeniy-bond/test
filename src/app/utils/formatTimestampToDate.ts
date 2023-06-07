import Web3 from 'web3';

const MULTIPLIER = 1_000;

export const formatTimestampToDate = (timestamp: string) => {
  const timestampNumber = Web3.utils.hexToNumber(timestamp);

  const date = new Date(timestampNumber * MULTIPLIER);

  return date.toString();
};
