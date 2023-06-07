import { useEffect } from 'react';

import { isValidAddress } from '../utils/isValidAddress';

export const useValidateAddress = (addressId?: string) => {
  useEffect(() => {
    const isValid = isValidAddress(addressId);

    if (!isValid && addressId) {
      throw new Error('Wrong address');
    }
  }, [addressId]);
};
