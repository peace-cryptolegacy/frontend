import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface TestamentInfo {
  selectedPlan: number;
  activeStep: number;
  beneficiaries: [];
  expirationDays: number;
  beneficiariesAffected: number;
}

const initialState: TestamentInfo = {
  selectedPlan: 0,
  activeStep: 0,
  beneficiaries: [],
  expirationDays: 0,
  beneficiariesAffected: 0,
};

const testamentInfoSlice = createSlice({
  name: 'testamentInfo',
  initialState,
  reducers: {
    setSelectedPlan(
      state: TestamentInfo,
      action: PayloadAction<{ selectedPlan: number }>
    ) {
      return {
        ...state,
        selectedPlan: action.payload.selectedPlan,
      };
    },
    setActiveStep(
      state: TestamentInfo,
      action: PayloadAction<{ activeStep: number }>
    ) {
      return {
        ...state,
        activeStep: action.payload.activeStep,
      };
    },
    setBeneficiaries(state: TestamentInfo, action: PayloadAction<any>) {
      return {
        ...state,
        beneficiaries: action.payload,
      };
    },
    setExpirationDays(
      state: TestamentInfo,
      action: PayloadAction<{ expirationDays: number }>
    ) {
      return {
        ...state,
        expirationDays: action.payload.expirationDays,
      };
    },
    setBeneficiariesAffected(
      state: TestamentInfo,
      action: PayloadAction<{ beneficiariesAffected: number }>
    ) {
      return {
        ...state,
        isConnecting: action.payload.beneficiariesAffected,
      };
    },
  },
});

export const {
  setSelectedPlan,
  setActiveStep,
  setBeneficiaries,
  setExpirationDays,
  setBeneficiariesAffected,
} = testamentInfoSlice.actions;

export const getSelectedPlan = (state: RootState) =>
  state.testamentInfo.selectedPlan;
export const te = (state: RootState) => state.testamentInfo.activeStep;
export const getBeneficiaries = (state: RootState) =>
  state.testamentInfo.beneficiaries;
export const getDay = (state: RootState) => state.testamentInfo.expirationDays;
export const getBeneficiariesAffected = (state: RootState) =>
  state.testamentInfo.beneficiariesAffected;

export default testamentInfoSlice.reducer;
