import { ethers } from 'ethers';
import { Address } from 'utils/Types';
import { erc20ABI, useContractWrite, usePrepareContractWrite } from 'wagmi';
import useGetDynamicVaults from './utils/useGetDynamicVaults';

const useApproveToken = (address: Address | undefined) => {
  const dynamicVaults = useGetDynamicVaults();

  const prepareTransact = usePrepareContractWrite({
    address: address ?? '',
    abi: erc20ABI,
    functionName: 'approve',
    args: [dynamicVaults?.address ?? '0x', ethers.constants.MaxUint256],
    enabled: dynamicVaults && address ? true : false,
  });

  const transact = useContractWrite(prepareTransact.config);

  return { prepareTransact, transact };
};

export default useApproveToken;
