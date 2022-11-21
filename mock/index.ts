export interface IUserData {
  selectedPlan: number;
  activeStep: number;
  beneficiaries: [];
  expirationDays: number;
  beneficiariesAffected: number;
}

export const initialValue: IUserData = {
  selectedPlan: 0,
  activeStep: 0,
  beneficiaries: [],
  expirationDays: 0,
  beneficiariesAffected: 0,
};
