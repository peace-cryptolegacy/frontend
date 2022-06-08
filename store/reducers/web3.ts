import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface Web3State {
  address: string;
  isConnected: boolean;
}

const initialState: Web3State = {
  address: '',
  isConnected: false
};

const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setAddress(state: Web3State, action: PayloadAction<{ address: string }>) {
      return {
        ...state,
        address: action.payload.address,
        isConnected: true
      };
    }
  }
})

export const { setAddress } = web3Slice.actions;

export const getAddress = (state: RootState) => state.web3.address;
export const getIsConnected = (state: RootState) => state.web3.isConnected;

export default web3Slice.reducer;
