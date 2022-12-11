import { BigNumber } from 'ethers';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import useGetDynamicVaults from './utils/useGetDynamicVaults';

const useUpdateInactivityMaximum = (
  newInactivityTime: BigNumber | undefined
) => {
  const dynamicVaults = useGetDynamicVaults();

  const prepareTransact = usePrepareContractWrite({
    address: dynamicVaults?.address ?? '',
    abi: dynamicVaults?.abi,
    functionName: 'updateInactivityMaximum',
    args: [newInactivityTime as BigNumber],
    enabled: !!newInactivityTime,
  });

  const transact = useContractWrite(prepareTransact.config);

  const transaction = useWaitForTransaction({ hash: transact.data?.hash });

  return { prepareTransact, transact, transaction };
};

export default useUpdateInactivityMaximum;
