import { Address } from 'utils/Types';

export interface IBeneficiary {
  name: string;
  address: Address;
  isClaimant: boolean;
  distribution: number;
}

export interface ITestamentInfo {
  selectedPlan: number;
  activeStep: number;
  beneficiaries: IBeneficiary[];
  expirationDays: number;
  signaturesRequired: number;
}

export const testamentInfoInitialValue: ITestamentInfo = {
  selectedPlan: 0,
  activeStep: 0,
  beneficiaries: [
    {
      name: '',
      address: '0x',
      isClaimant: false,
      distribution: 0,
    },
  ],
  expirationDays: 0,
  signaturesRequired: 0,
};
