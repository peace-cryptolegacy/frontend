import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBeneficiary } from 'mock';
import { Address } from 'wagmi';
import { RootState } from '../index';

interface TestamentCreationInfo {
  selectedPlan: number;
  activeStep: number;
  beneficiaries: IBeneficiary[];
  expirationDays: number;
  beneficiariesAffected: number;
}

const initialState: TestamentCreationInfo = {
  selectedPlan: 0,
  activeStep: 0,
  beneficiaries: [
    { name: '', address: '0x' as Address, isClaimant: false, distribution: 0 },
  ],
  expirationDays: 0,
  beneficiariesAffected: 0,
};

export const testamentCreationInfoSlice = createSlice({
  name: 'testamentCreationInfo',
  initialState,
  reducers: {
    dispatchTestamentCreationInfo: (
      state: TestamentCreationInfo,
      action: PayloadAction<{
        selectedPlan: number;
        activeStep: number;
        beneficiaries: IBeneficiary[];
        expirationDays: number;
        beneficiariesAffected: number;
      }>
    ) => {
      state.selectedPlan = action.payload.selectedPlan;
      state.activeStep = action.payload.activeStep;
      state.beneficiaries = action.payload.beneficiaries;
      state.expirationDays = action.payload.expirationDays;
      state.beneficiariesAffected = action.payload.beneficiariesAffected;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getTestamentCreationInfo = (state: RootState) =>
  state.testamentCreationInfo;

export const { dispatchTestamentCreationInfo } =
  testamentCreationInfoSlice.actions;

export default testamentCreationInfoSlice.reducer;
