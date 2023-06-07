import Web3 from 'web3';

export const isValidAddress = (address = '') => {
  return Web3.utils.isAddress(address);
};
