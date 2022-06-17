import { BigNumber, Contract, ContractTransaction, Signer, constants, providers } from 'ethers';
import { getProvider } from 'utils/web3/provider';
import ERC20Token from '@openzeppelin/contracts/build/contracts/ERC20.json';

const heritageContractAddress = process.env.NEXT_PUBLIC_HERITAGE_CONTRACT_ADDRESS;

type Approve = (token: string) => void;
type Allowance = (token: string) => Promise<BigNumber>;

interface IERC20Token extends Contract {
  allowance(owner: string, spender: string): Promise<BigNumber>;
  approve(spender: string, amount: BigNumber): Promise<ContractTransaction>;
};

export const approve: Approve = async (token) => {
  const provider: providers.Web3Provider = await getProvider();
  const signer: Signer = provider.getSigner();
  const ERC20Contract = new Contract(
    token,
    ERC20Token.abi,
    signer
  ) as IERC20Token;
  const address: string = await signer.getAddress();
  const allowance: BigNumber = await ERC20Contract.allowance(address, heritageContractAddress);

  if (allowance.lt(constants.MaxUint256)) {
    const tx: ContractTransaction = await ERC20Contract.approve(heritageContractAddress, constants.MaxUint256);

    await tx.wait();
  }
}

export const getAllowance: Allowance = async (token) => {
  const provider: providers.Web3Provider = await getProvider();
  const signer: Signer = provider.getSigner();
  const address: string = await signer.getAddress();
  const ERC20Contract = new Contract(
    token,
    ERC20Token.abi,
    signer
  ) as IERC20Token;

  const allowance: BigNumber = await ERC20Contract.allowance(address, heritageContractAddress);

  return allowance;
}
