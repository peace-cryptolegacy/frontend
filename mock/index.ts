export interface IBeneficiary {
  name: string;
  address: string;
  isClaimant: boolean;
  distribution: number;
}

export interface IUserData {
  selectedPlan: number;
  activeStep: number;
  beneficiaries: IBeneficiary[];
  expirationDays: number;
  beneficiariesAffected: number;
}

export const initialValue: IUserData = {
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
