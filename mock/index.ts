export interface IBeneficiary {
  name: string;
  address: string;
  isClaimant: boolean;
  distribution: number;
}

export interface ITestamentInfo {
  selectedPlan: number;
  activeStep: number;
  beneficiaries: IBeneficiary[];
  expirationDays: number;
  beneficiariesAffected: number;
}

export const testamentInfoInitialValue: ITestamentInfo = {
  selectedPlan: 0,
  activeStep: 0,
  beneficiaries: [
    {
      name: '',
      address: '',
      isClaimant: false,
      distribution: 0,
    },
  ],
  expirationDays: 0,
  beneficiariesAffected: 0,
};
