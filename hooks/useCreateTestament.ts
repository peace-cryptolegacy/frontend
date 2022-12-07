import { TestamentCreationParams } from 'utils/Types';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import useGetDynamicVaults from './utils/useGetDynamicVaults';

const useCreateTestament = (
  ...[claimant, inactivityMaximum, beneficiaries]:
    | TestamentCreationParams
    | undefined[]
) => {
  const dynamicVaults = useGetDynamicVaults();

  const prepareTransact = usePrepareContractWrite({
    address: dynamicVaults?.address ?? '',
    abi: dynamicVaults?.abi,
    functionName: 'createTestament',
    args: [
      claimant,
      inactivityMaximum,
      beneficiaries,
    ] as unknown as TestamentCreationParams,
    enabled:
      dynamicVaults && claimant && inactivityMaximum && beneficiaries
        ? true
        : false,
  });

  const transact = useContractWrite(prepareTransact.config);

  const transaction = useWaitForTransaction({ hash: transact.data?.hash });

  return { prepareTransact, transact, transaction };
};

export default useCreateTestament;
