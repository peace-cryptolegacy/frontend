import { BigNumber, Contract, ContractTransaction, providers } from 'ethers';
import { getProvider } from 'utils/web3/provider';
import get from 'lodash/get';
import Heritage from 'utils/web3/heritage.json';

const heritageContractAddress = process.env.NEXT_PUBLIC_HERITAGE_CONTRACT_ADDRESS;

export enum Status {
  ACTIVE,
  INACTIVE,
  INHERITED
};

export interface ITestator {
  inheritor: string;
  status: Status;
  proofOfTimestamp: BigNumber;
  token: string;
  maxDays: number;
}

interface IHeritage extends Contract {
  addTestator(_inheritor: string, _token: String, _maxDays: BigNumber): Promise<ContractTransaction>;
  getTestator(_testatorAddress: string): Promise<[string, Status, BigNumber, string, number]>;
  inherit(): Promise<ContractTransaction>;
  updateProof(): Promise<ContractTransaction>;
};

type AddTestator = (inheritor: string, maxDays: number, token: string) => void;
type GetTestator = (tpestator: string) => Promise<ITestator | undefined>;
type Inherit = () => Promise<void>;
type UpdateProof = () => Promise<void>;

export const addTestator: AddTestator = async (inheritor, maxDays, token) => {
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
      token,
      BigNumber.from(maxDays)
    );

    await tx.wait();
  } catch (error) {
    const message: string = get(error, 'error.data.message', '');

    throw message.replace('execution reverted:', '').trim();
  }
};

export const getTestator: GetTestator = async (testator) => {
  try {
    const provider: providers.Web3Provider = await getProvider();
    const signer: providers.JsonRpcSigner = provider.getSigner();

    const HeritageContract = new Contract(
      heritageContractAddress,
      Heritage.abi,
      signer
    ) as IHeritage;

    const [inheritor, status, proofOfTimestamp, token, maxDays] = await HeritageContract.getTestator(testator);

    return {
      inheritor, status, proofOfTimestamp, token, maxDays
    };
  } catch (error) {
    return undefined;
  }
};

export const inherit: Inherit = async () => {
  try {
    const provider: providers.Web3Provider = await getProvider();
    const signer: providers.JsonRpcSigner = provider.getSigner();

    const HeritageContract = new Contract(
      heritageContractAddress,
      Heritage.abi,
      signer
    ) as IHeritage;

    const tx: ContractTransaction = await HeritageContract.inherit();

    await tx.wait();
  } catch (error) {
    const message: string = get(error, 'error.data.message', '');

    throw message.replace('execution reverted:', '').trim();
  }
};

export const updateProof: UpdateProof = async () => {
  try {
    const provider: providers.Web3Provider = await getProvider();
    const signer: providers.JsonRpcSigner = provider.getSigner();

    const HeritageContract = new Contract(
      heritageContractAddress,
      Heritage.abi,
      signer
    ) as IHeritage;

    const tx: ContractTransaction = await HeritageContract.updateProof();

    await tx.wait();
  } catch (error) {
    const message: string = get(error, 'error.data.message', '');

    throw message.replace('execution reverted:', '').trim();
  }
};
