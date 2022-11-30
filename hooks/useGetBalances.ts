import { Address, erc20ABI, useContractReads } from 'wagmi';

type Props = [ownerAddress: Address, tokenAddresses: Address[]];

const useGetBalances = (...[ownerAddress, tokenAddresses]: Partial<Props>) => {
  let config: {
    address: Address;
    abi: typeof erc20ABI;
    functionName: 'balanceOf';
    args: [Address];
  }[] = [];

  if (tokenAddresses) {
    tokenAddresses.map((address) =>
      config.push({
        address: address,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [ownerAddress as Address],
      })
    );
  }

  return useContractReads({
    contracts: config,
    enabled: !!tokenAddresses || !!ownerAddress,
  });
};

export default useGetBalances;
