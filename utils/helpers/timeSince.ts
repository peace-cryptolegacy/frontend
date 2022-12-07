import { BigNumber } from 'ethers';

// Takes a unix timestamp and return the time since in a human readable format
const timeSince = (
  date: BigNumber | number,
  unit: 'days' | 'seconds' = 'days',
  type: 'number' | 'BigNumber' = 'number'
) => {
  const DAY = 86400; // seconds in a day

  if (typeof date === 'number') {
    if (unit === 'days') {
      const res = Math.round((Date.now() / 1000 - date) / DAY);
      if (type === 'number') {
        return res;
      }
      if (type === 'BigNumber') {
        return BigNumber.from(res);
      }
    }
    return;
  }
  // checking for the typeof BigNumber does not work
  if (date._hex !== undefined) {
    if (unit === 'days') {
      const res = Math.round(
        (Date.now() / 1000 - parseInt(date.toString())) / DAY
      );
      if (type === 'number') {
        return res;
      }
      if (type === 'BigNumber') {
        return BigNumber.from(res);
      }
    }

    if (unit === 'seconds') {
      const res = parseInt(date.toString());
      if (type === 'number') {
        return res;
      }
      if (type === 'BigNumber') {
        return BigNumber.from(res);
      }
    }
    return;
  }
};

export default timeSince;
