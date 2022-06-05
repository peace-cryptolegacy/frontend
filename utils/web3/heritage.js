import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { getProvider } from 'utils/web3/provider';
import Heritage from 'utils/web3/heritage.json';

const heritageContractAddress = process.env.NEXT_PUBLIC_HERITAGE_CONTRACT_ADDRESS;
const mockTokenAddress = process.env.NEXT_PUBLIC_MOCK_TOKEN_ADDRESS;

export const addTestator = async ({ maxDays, inheritor }) => {
  const provider = await getProvider();
  const signer = provider.getSigner();
  
  const HeritageContract = new Contract(
    heritageContractAddress,
    Heritage.abi,
    signer
  );

  console.log(
    '--- ',
    inheritor,
    mockTokenAddress,
    maxDays
  );

  // @params
  // address _inheritor,
  // address _token,
  // uint16 _maxDays
  const tx = await HeritageContract.addTestator(
    inheritor,
    mockTokenAddress,
    BigNumber.from(maxDays)
  );

  await tx.wait();
};
