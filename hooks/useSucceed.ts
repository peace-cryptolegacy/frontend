import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { Address } from '../utils/Types';
import useGetDynamicVaults from './utils/useGetDynamicVaults';

type Props = [dynamicVaultOwner: Address, tokens: Address[]];

const useSucceed = (...[dynamicVaultOwner, tokens]: Partial<Props>) => {
  const dynamicVaults = useGetDynamicVaults();

  const prepareTransact = usePrepareContractWrite({
    address: dynamicVaults?.address ?? '',
    abi: dynamicVaults?.abi,
    functionName: 'succeed',
    args: [dynamicVaultOwner, tokens] as Props,
    enabled: dynamicVaultOwner && tokens && tokens.length ? true : false,
  });

  const transact = useContractWrite(prepareTransact.config);

  const transaction = useWaitForTransaction({ hash: transact.data?.hash });

  return { prepareTransact, transact, transaction };
};

export default useSucceed;
