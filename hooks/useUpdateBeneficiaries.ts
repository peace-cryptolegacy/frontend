import { BigNumber } from 'ethers';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { Address } from '../utils/Types';
import useGetDynamicVaults from './utils/useGetDynamicVaults';

type Props = readonly [
  names: readonly string[],
  addresses: readonly Address[],
  inheritancePercentages: readonly BigNumber[],
  indexes: readonly BigNumber[]
];

const useUpdateBeneficiaries = (
  ...[names, addresses, inheritancePercentages, indexes]: Props
) => {
  const dynamicVaults = useGetDynamicVaults();

  const prepareTransact = usePrepareContractWrite({
    address: dynamicVaults?.address ?? '',
    abi: dynamicVaults?.abi,
    functionName: 'updateBeneficiaries',
    args: [names, addresses, inheritancePercentages, indexes] as Props,
    enabled:
      names.length &&
      addresses.length &&
      inheritancePercentages.length &&
      indexes.length
        ? true
        : false,
  });

  const transact = useContractWrite(prepareTransact.config);

  const transaction = useWaitForTransaction({ hash: transact.data?.hash });

  return { prepareTransact, transact, transaction };
};

export default useUpdateBeneficiaries;
