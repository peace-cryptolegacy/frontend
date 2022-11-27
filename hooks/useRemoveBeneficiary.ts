import { Address } from 'utils/Types';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import useGetDynamicVaults from './utils/useGetDynamicVaults';

const useRemoveBeneficiary = (address: Address) => {
  const dynamicVaults = useGetDynamicVaults();

  const prepareTransact = usePrepareContractWrite({
    address: dynamicVaults?.address ?? '',
    abi: dynamicVaults?.abi,
    functionName: 'removeBeneficiary',
    args: [address],
    enabled: dynamicVaults && address ? true : false,
  });

  const transact = useContractWrite(prepareTransact.config);

  return { prepareTransact, transact };
};

export default useRemoveBeneficiary;
