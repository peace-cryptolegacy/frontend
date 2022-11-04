import ERC20Token from '@openzeppelin/contracts/build/contracts/ERC20.json';
import {
  BigNumber,
  constants,
  Contract,
  ContractTransaction,
  providers,
  Signer,
} from 'ethers';
import { getProvider } from 'utils/web3/provider';

const heritageContractAddress =
  process.env.NEXT_PUBLIC_HERITAGE_CONTRACT_ADDRESS ?? '';

interface IERC20Token extends Contract {
  // eslint-disable-next-line no-unused-vars
  allowance(owner: string, spender: string): Promise<BigNumber>;
  // eslint-disable-next-line no-unused-vars
  approve(spender: string, amount: BigNumber): Promise<ContractTransaction>;
}

export const approve = async (token: string) => {
  const provider: providers.Web3Provider = await getProvider();
  const signer: Signer = provider.getSigner();
  const ERC20Contract = new Contract(
    token,
    ERC20Token.abi,
    signer
  ) as IERC20Token;
  const address: string = await signer.getAddress();
  const allowance: BigNumber = await ERC20Contract.allowance(
    address,
    heritageContractAddress
  );

  if (allowance.lt(constants.MaxUint256)) {
    const tx: ContractTransaction = await ERC20Contract.approve(
      heritageContractAddress,
      constants.MaxUint256
    );

    await tx.wait();
  }
};

export const getAllowance = async (token: string) => {
  const provider: providers.Web3Provider = await getProvider();
  const signer: Signer = provider.getSigner();
  const address: string = await signer.getAddress();
  const ERC20Contract = new Contract(
    token,
    ERC20Token.abi,
    signer
  ) as IERC20Token;

  const allowance: BigNumber = await ERC20Contract.allowance(
    address,
    heritageContractAddress
  );

  return allowance;
};
