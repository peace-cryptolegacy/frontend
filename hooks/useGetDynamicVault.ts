import { Address, useContractRead } from 'wagmi';
import useGetDynamicVaults from './utils/useGetDynamicVaults';

function useGetDynamicVault(owner: Address | undefined) {
  const dynamicVaults = useGetDynamicVaults();

  const dynamicVault = useContractRead({
    address: dynamicVaults?.address,
    abi: dynamicVaults?.abi,
    functionName: 'dynamicVaults',
    args: [owner as Address],
    enabled: !!owner,
  });

  return dynamicVault;
}

export default useGetDynamicVault;
