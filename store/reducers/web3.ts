import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fromWei } from 'utils/converter';
import { RootState } from 'store';

export interface Web3State {
  address: string;
  balance: string;
  isConnected: boolean;
}

const initialState: Web3State = {
  address: '',
  balance: '0',
  isConnected: false
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setProvider(state: Web3State, action: PayloadAction<{ address: string, balance: string }>) {
      return {
        ...state,
        address: action.payload.address,
        balance: action.payload.balance,
        isConnected: true
      };
    }
  }
})

export const { setProvider } = web3Slice.actions;

export const getAddress = (state: RootState) => state.web3.address;
export const getBalance = (state: RootState) => fromWei(state.web3.balance).toFixed(2);
export const getIsConnected = (state: RootState) => state.web3.isConnected;

export default web3Slice.reducer;
