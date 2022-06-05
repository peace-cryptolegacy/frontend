import { createSlice } from '@reduxjs/toolkit';

const web3Slice = createSlice({
  name: 'web3',
  initialState: {
    address: null
  },
  reducers: {
    setAddress(state, action) {
      return {
        ...state,
        address: action.payload.address
      };
    }
  }
})

export const { setAddress } = web3Slice.actions;

export default web3Slice.reducer;
