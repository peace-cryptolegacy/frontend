import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import useGetDynamicVaults from './utils/useGetDynamicVaults';

const useSignalLife = () => {
  const dynamicVaults = useGetDynamicVaults();

  const prepareTransact = usePrepareContractWrite({
    address: dynamicVaults?.address ?? '',
    abi: dynamicVaults?.abi,
    functionName: 'signalLife',
  });

  const transact = useContractWrite(prepareTransact.config);

  const transaction = useWaitForTransaction({ hash: transact.data?.hash });

  return { prepareTransact, transact, transaction };
};

export default useSignalLife;
