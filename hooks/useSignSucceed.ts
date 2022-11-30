import { Address, useSignMessage } from 'wagmi';

const useSignSucceed = (dynamicVaultOwner: Address) => {
  return useSignMessage({
    message: `I agree for the funds owned by ${dynamicVaultOwner} to be transferred to the beneficiaries once the multisig is complete.`,
  });
};

export default useSignSucceed;
