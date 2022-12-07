import { Address, useSignMessage } from 'wagmi';

const useSignSucceed = (dynamicVaultOwner: Address) => {
  const message = `I agree for the funds owned by ${dynamicVaultOwner} to be transferred to the beneficiaries once the multisig is complete.`;
  const transact = useSignMessage({
    message: message,
  });

  return { message, transact };
};

export default useSignSucceed;
