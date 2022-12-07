import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils.js';

const formatBigNumber = (value: BigNumber, decimals = 2) => {
  return (+formatEther(value.toString())).toFixed(decimals);
};

export default formatBigNumber;
