import { BigNumber } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";

export function fromWei(amount: string | BigNumber): Number {
  return Number(formatUnits(amount, 18));
}

export function toWei(amount: string): BigNumber {
  return parseUnits(amount);
}
