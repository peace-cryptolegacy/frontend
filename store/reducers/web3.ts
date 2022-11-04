import { BigNumber } from 'ethers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fromWei } from 'utils/converter';
import { getChainById } from 'utils/chains/index';
import { RootState } from 'store';

import type { Chain } from 'utils/chains/index';

export interface Web3State {
  address: string;
  balance: BigNumber;
  chainId: number;
  inheritor?: any;
  isConnected: boolean;
  isConnecting: boolean;
  testator?: any;
}

const initialState: Web3State = {
  address: '',
  balance: BigNumber.from(0),
  chainId: 0,
  inheritor: undefined,
  isConnected: false,
  isConnecting: false,
  testator: undefined,
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setChainId(state: Web3State, action: PayloadAction<{ chainId: number }>) {
      return {
        ...state,
        chainId: action.payload.chainId,
      };
    },
    setProvider(
      state: Web3State,
      action: PayloadAction<{ address: string; balance: BigNumber }>
    ) {
      return {
        ...state,
        address: action.payload.address,
        balance: action.payload.balance,
        isConnected: true,
      };
    },
    setInheritor(state: Web3State, action: PayloadAction<any>) {
      return {
        ...state,
        inheritor: action.payload,
      };
    },
    setTestator(state: Web3State, action: PayloadAction<any | undefined>) {
      return {
        ...state,
        testator: action.payload,
      };
    },
    setIsConnecting(state: Web3State, action: PayloadAction<boolean>) {
      return {
        ...state,
        isConnecting: action.payload,
      };
    },
  },
});

export const {
  setIsConnecting,
  setChainId,
  setInheritor,
  setProvider,
  setTestator,
} = web3Slice.actions;

export const getAddress = (state: RootState) => state.web3.address;
export const getBalance = (state: RootState) =>
  fromWei(state.web3.balance).toFixed(2);
export const getChainInfo = (state: RootState): Chain | undefined =>
  getChainById(state.web3.chainId);
export const getIsConnected = (state: RootState) => state.web3.isConnected;
export const getInheritor = (state: RootState) => state.web3.inheritor;
export const getTestator = (state: RootState) => state.web3.testator;

export default web3Slice.reducer;
