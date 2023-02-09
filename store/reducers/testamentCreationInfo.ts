import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBeneficiary } from 'mock';
import { DeepPartial } from 'utils/Types';
import { RootState } from '../index';

interface TestamentCreationInfo {
  selectedPlan: number;
  activeStep: number;
  beneficiaries: DeepPartial<IBeneficiary[]>;
  expirationDays: number;
  signaturesRequired: number;
}

const initialState: TestamentCreationInfo = {
  selectedPlan: 0,
  activeStep: 0,
  beneficiaries: [
    {
      name: undefined,
      address: undefined,
      isClaimant: false,
      distribution: undefined,
    },
  ],
  expirationDays: 360,
  signaturesRequired: 1,
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
        beneficiaries: DeepPartial<IBeneficiary[]>;
        expirationDays: number;
        signaturesRequired: number;
      }>
    ) => {
      state.selectedPlan = action.payload.selectedPlan;
      state.activeStep = action.payload.activeStep;
      state.beneficiaries = action.payload.beneficiaries;
      state.expirationDays = action.payload.expirationDays;
      state.signaturesRequired = action.payload.signaturesRequired;
    },
  },
});

// A small helper of user state for `useSelector` function.
export const getTestamentCreationInfo = (state: RootState) =>
  state.testamentCreationInfo;

export const { dispatchTestamentCreationInfo } =
  testamentCreationInfoSlice.actions;

export default testamentCreationInfoSlice.reducer;
