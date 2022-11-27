import { BigNumber } from 'ethers';

const percentageCalculator = (numerator: BigNumber, denominator: BigNumber) => {
  // checking for typeof BigNumber does not work
  if (numerator._hex !== undefined && denominator._hex !== undefined) {
    return (
      (parseInt(numerator.toString()) /
        (denominator.toString() === '0'
          ? 1
          : parseInt(denominator.toString()))) *
      100
    );
  }
};

export default percentageCalculator;
