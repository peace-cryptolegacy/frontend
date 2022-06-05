import { Contract } from "@ethersproject/contracts";
import { getProvider } from 'utils/web3/provider';
import { MaxUint256 } from "@ethersproject/constants/lib/bignumbers";
import ERC20Token from '@openzeppelin/contracts/build/contracts/ERC20.json';

const heritageContractAddress = process.env.NEXT_PUBLIC_HERITAGE_CONTRACT_ADDRESS;
const mockTokenAddress = process.env.NEXT_PUBLIC_MOCK_TOKEN_ADDRESS;

export const approve = async () => {
  const provider = await getProvider();
  const signer = provider.getSigner();
  const ERC20Contract =  new Contract(
    mockTokenAddress,
    ERC20Token.abi,
    signer
  );
  const address = signer.getAddress();
  const allowance = await ERC20Contract.allowance(address, heritageContractAddress);

  if (allowance.lt(MaxUint256)) {
    const tx = await ERC20Contract.approve(heritageContractAddress, MaxUint256);

    await tx.wait();
  }
}
