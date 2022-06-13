import { BigNumber } from 'ethers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fromWei } from 'utils/converter';
import { getChainById } from 'utils/chains/index';
import { RootState } from 'store';
import { Status } from 'utils/web3/heritage';

import type { Chain } from 'utils/chains/index';
import type { ITestator } from 'utils/web3/heritage';

export interface Web3State {
  address: string;
  balance: BigNumber;
  chainId: number;
  isConnected: boolean;
  testator?: ITestator;
}

const initialState: Web3State = {
  address: '',
  balance: BigNumber.from(0),
  chainId: 0,
  isConnected: false,
  testator: undefined
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setProvider(state: Web3State, action: PayloadAction<{ address: string, balance: BigNumber, chainId: number }>) {
      return {
        ...state,
        address: action.payload.address,
        balance: action.payload.balance,
        chainId: action.payload.chainId,
        isConnected: true
      };
    },
    setTestator(state: Web3State, action: PayloadAction<ITestator>) {
      return {
        ...state,
        testator: action.payload
      }
    }
  }
})

export const { setProvider, setTestator } = web3Slice.actions;

export const getAddress = (state: RootState) => state.web3.address;
export const getBalance = (state: RootState) => fromWei(state.web3.balance).toFixed(2);
export const getChainInfo = (state: RootState): Chain => getChainById(state.web3.chainId);
export const getIsConnected = (state: RootState) => state.web3.isConnected;
export const getTestator = (state: RootState) => {
  const { testator } = state.web3;

  if (testator) {
    return {
      ...testator,
      status: Status[testator.status]
    };
  }
}

export default web3Slice.reducer;
