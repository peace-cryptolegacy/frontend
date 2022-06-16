import { BigNumber, Contract, ContractReceipt, ContractTransaction, providers, utils } from 'ethers';
import { getProvider } from 'utils/web3/provider';
import { handleError } from 'utils/web3/errors';
import get from 'lodash/get';
import Heritage from 'utils/web3/heritage.json';

const heritageContractAddress = process.env.NEXT_PUBLIC_HERITAGE_CONTRACT_ADDRESS;

export enum Status {
  ACTIVE,
  INACTIVE,
  INHERITED
};

export type ITestament = {
  inheritor: string;
  status: Status;
  proofOfTimestamp: BigNumber;
  token: string;
  maxDays: number;
}

export type IEventDecoded = ITestament & {
  testator?: string;
  balance?: BigNumber;
}

interface IHeritage extends Contract {
  addTestament(_inheritor: string, _token: String, _maxDays: BigNumber): Promise<ContractTransaction>;
  getInheritor(_inheritorAddress: string): Promise<ITestament>;
  getTestator(_testatorAddress: string): Promise<ITestament>;
  updateTestament(_inheritor: string, _token: String, _maxDays: BigNumber): Promise<ContractTransaction>;
  updateProof(): Promise<ContractTransaction>;
  inherit(): Promise<ContractTransaction>;
  revoke(): Promise<ContractTransaction>;
};

type AddTestament = (inheritor: string, maxDays: number, token: string) => Promise<IEventDecoded | undefined>;
type GetInheritor = (inheritor: string) => Promise<IEventDecoded | undefined>;
type GetTestator = (testator: string) => Promise<IEventDecoded | undefined>;
type UpdateTestament = (inheritor: string, maxDays: number, token: string) => Promise<IEventDecoded | undefined>;
type UpdateProof = () => Promise<IEventDecoded | undefined>;
type Inherit = () => Promise<IEventDecoded | undefined>;
type Revoke = () => Promise<IEventDecoded | undefined>;

function _decodeEvent(receipt: ContractReceipt): IEventDecoded {
  const coder = new utils.AbiCoder();
  const data: string = get(receipt, 'events[0].data');
  const types = ["address", "address", "uint8", "uint256", "address", "uint16"];

  const [testator, inheritor, status, proofOfTimestamp, token, maxDays] = coder.decode(types, data);

  return { testator, inheritor, status, proofOfTimestamp, token, maxDays };
}

async function _execute(method: string, params: any[] = []): Promise<IEventDecoded | ITestament | undefined> {
  try {
    const provider: providers.Web3Provider = await getProvider();
    const signer: providers.JsonRpcSigner = provider.getSigner();

    const HeritageContract = new Contract(
      heritageContractAddress,
      Heritage.abi,
      signer
    ) as IHeritage;

    const tx: ContractTransaction = await HeritageContract[method](...params);

    const receipt: ContractReceipt = await tx.wait();

    return _decodeEvent(receipt);
  } catch (error) {
    handleError(error as Error);
  }
}

async function _read(method: string, params: any[] = []): Promise<ITestament | undefined> {
  try {
    const provider: providers.Web3Provider = await getProvider();
    const signer: providers.JsonRpcSigner = provider.getSigner();

    const HeritageContract = new Contract(
      heritageContractAddress,
      Heritage.abi,
      signer
    ) as IHeritage;

    const [inheritor, status, proofOfTimestamp, token, maxDays] = await HeritageContract[method](...params);

    return {
      inheritor, status, proofOfTimestamp, token, maxDays
    };
  } catch (error) {
    handleError(error as Error);
  }
}

export const addTestament: AddTestament = async (inheritor, maxDays, token) => {
  return await _execute('addTestament', [
    inheritor,
    token,
    BigNumber.from(maxDays)
  ]);
};

export const getTestator: GetTestator = async (testator) => {
  return await _read('getTestator', [testator]);
};

export const getInheritor: GetInheritor = async (testator) => {
  return await _read('getInheritor', [testator]);
};

export const inherit: Inherit = async () => {
  return await _execute('inherit');
};

export const updateProof: UpdateProof = async () => {
  return await _execute('updateProof');
};

export const updateTestament: UpdateTestament = async (inheritor, maxDays, token) => {
  return await _execute('updateTestament', [
    inheritor,
    token,
    BigNumber.from(maxDays)
  ]);
};

export const revoke: Revoke = async () => {
  return await _execute('revoke');
};
