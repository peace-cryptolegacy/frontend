// @ts-nocheck

import {
  BigNumber,
  Contract,
  ContractReceipt,
  ContractTransaction,
  providers,
  utils,
} from "ethers";
import { getProvider } from "utils/web3/provider";
import { handleError } from "utils/web3/errors";
import get from "lodash/get";
import TestamentFactory from "utils/web3/TestamentFactory.json";

const heritageContractAddress =
  process.env.NEXT_PUBLIC_HERITAGE_CONTRACT_ADDRESS;

export interface ITestator {
  inheritor: string;
  status: Status;
  proofOfTimestamp: BigNumber;
  token: string;
  maxDays: number;
}

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
    const message: string = get(error, "error.data.message", "");

    throw message.replace("execution reverted:", "").trim();
  }
};

async function _execute(method: string, params: any[] = []): Promise<any> {
  try {
    console.log(params);

    const provider: providers.Web3Provider = await getProvider();
    const signer: providers.JsonRpcSigner = provider.getSigner();

    const testamentFactory = new Contract(
      heritageContractAddress,
      TestamentFactory.abi,
      signer
    );

    const tx = await testamentFactory[method](...params);

    const receipt = await tx.wait();

    return receipt;
  } catch (error) {
    console.log("---- ", error);

    throw handleError(error as Error);
  }
}

export const getTestator: GetTestator = async (testator) => {
  try {
    const provider: providers.Web3Provider = await getProvider();
    const signer: providers.JsonRpcSigner = provider.getSigner();

    const HeritageContract = new Contract(
      heritageContractAddress,
      Heritage.abi,
      signer
    ) as IHeritage;

    const [inheritor, status, proofOfTimestamp, token, maxDays] =
      await HeritageContract.getTestator(testator);

    return {
      inheritor,
      status,
      proofOfTimestamp,
      token,
      maxDays,
    };
  } catch (error) {
    return undefined;
  }
};

// async function _read(method: string, params: any[] = []): Promise<ITestament> {
//   try {
//     const provider: providers.Web3Provider = await getProvider();
//     const signer: providers.JsonRpcSigner = provider.getSigner();

//     const HeritageContract = new Contract(
//       heritageContractAddress,
//       Heritage.abi,
//       signer
//     ) as IHeritage;

//     const [inheritor, status, proofOfTimestamp, token, maxDays] = await HeritageContract[method](...params);

//     return {
//       inheritor, status, proofOfTimestamp, token, maxDays
//     };
//   } catch (error) {
//     throw handleError(error as Error);
//   }
// }

// address _testatorWallet,
// address _claimer,
// Testament.Inheritor[] calldata _inheritors,
// uint16 _maxDays

export const writeTestament = async (_inheritors: any, _maxDays: any) => {
  const provider: providers.Web3Provider = await getProvider();

  const claimer = _inheritors.find(({ isClaimant }) => isClaimant);

  const inheritors = _inheritors.map(
    ({ address, distribution, isClaimant, name }) => {
      // return {
      //   inheritorAddress: address,
      //   inheritedPercentage: BigNumber.from(distribution),
      //   claimer: isClaimant
      // };

      return [address, BigNumber.from(distribution), isClaimant];
    }
  );

  return await _execute("writeTestament", [
    await provider.getSigner().getAddress(),
    claimer.address,
    inheritors,
    BigNumber.from(_maxDays),
  ]);
};

// export const getTestator: GetTestator = async (testator) => {
//   return await _read('getTestator', [testator]);
// };

// export const getInheritor: GetInheritor = async (testator) => {
//   return await _read('getInheritor', [testator]);
// };

// export const inherit: Inherit = async () => {
//   return await _execute('inherit');
// };

// export const updateProof: UpdateProof = async () => {
//   return await _execute('updateProof');
// };

// export const updateTestament: UpdateTestament = async (inheritor, maxDays, token) => {
//   return await _execute('updateTestament', [
//     inheritor,
//     token,
//     BigNumber.from(maxDays)
//   ]);
// };

// export const revoke: Revoke = async () => {
//   return await _execute('revoke');
// };
