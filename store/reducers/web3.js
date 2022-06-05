import { createSlice } from '@reduxjs/toolkit';

const web3Slice = createSlice({
  name: 'web3',
  initialState: {
    address: null,
    isConnected: false
  },
  reducers: {
    setAddress(state, action) {
      return {
        ...state,
        address: action.payload.address,
        isConnected: true
      };
    }
  }
})

export const { setAddress } = web3Slice.actions;

export default web3Slice.reducer;
