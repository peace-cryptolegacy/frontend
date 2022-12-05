import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { Address } from '../utils/Types';
import useGetDynamicVaults from './utils/useGetDynamicVaults';

const useSucceed = (dynamicVaultOwner: Address) => {
  const dynamicVaults = useGetDynamicVaults();

  const prepareTransact = usePrepareContractWrite({
    address: dynamicVaults?.address ?? '',
    abi: dynamicVaults?.abi,
    functionName: 'succeed',
    args: [dynamicVaultOwner as Address],
    enabled: dynamicVaultOwner && true,
  });

  const transact = useContractWrite(prepareTransact.config);

  const transaction = useWaitForTransaction({ hash: transact.data?.hash });

  return { prepareTransact, transact, transaction };
};

export default useSucceed;
