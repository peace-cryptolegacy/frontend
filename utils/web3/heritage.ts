import { BigNumber, Contract, ContractTransaction, providers } from 'ethers';
import { getProvider } from 'utils/web3/provider';
import get from 'lodash/get';
import Heritage from 'utils/web3/heritage.json';

const heritageContractAddress = process.env.NEXT_PUBLIC_HERITAGE_CONTRACT_ADDRESS;
const mockTokenAddress = process.env.NEXT_PUBLIC_MOCK_TOKEN_ADDRESS;

type AddTestator = (inheritor: string, maxDays: number) => void;

interface IHeritage extends Contract {
  addTestator(_inheritor: string, _token: String, _maxDays: BigNumber): Promise<ContractTransaction>;
};

export const addTestator: AddTestator = async (inheritor, maxDays) => {
  try {
    const provider: providers.Web3Provider = await getProvider();
    const signer: providers.JsonRpcSigner = provider.getSigner();

    const HeritageContract = new Contract(
      heritageContractAddress,
      Heritage.abi,
      signer
    ) as IHeritage;

    const tx: ContractTransaction = await HeritageContract.addTestator(
      inheritor,
      mockTokenAddress,
      BigNumber.from(maxDays)
    );

    await tx.wait();
  } catch (error) {
    const message: string = get(error, 'error.data.message', '');

    throw message.replace('execution reverted:', '').trim();
  }
};
