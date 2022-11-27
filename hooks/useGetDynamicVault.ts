import { readContract } from '@wagmi/core';
import { useCallback } from 'react';
import { Address } from 'utils/Types';
import useGetDynamicVaults from './utils/useGetDynamicVaults';

function useGetDynamicVault() {
  const dynamicVaults = useGetDynamicVaults();

  const getDynamicVault = useCallback(
    async (owner: Address | undefined) => {
      return (
        owner &&
        dynamicVaults &&
        (await readContract({
          address: dynamicVaults.address ?? '',
          abi: dynamicVaults.abi,
          functionName: 'dynamicVaults',
          args: [owner],
        }))
      );
    },
    [dynamicVaults]
  );

  return getDynamicVault;
}

export default useGetDynamicVault;
