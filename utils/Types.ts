import { BigNumber } from 'ethers';
import { IBeneficiary } from 'mock';

export type UserPlans = (
  | 'Inheritance Plan'
  | 'Backup Wallet'
  | 'Expender Wallet'
  | 'Migration Plan'
)[];

export type Address = `0x${string}`;

export type Beneficiary = {
  new?: boolean;
  name: string;
  address_: Address;
  inheritancePercentage: BigNumber;
};

export type TestamentCreationParams = [
  inactivityMaximum: BigNumber,
  beneficiaries: Beneficiary[]
];

export type Testament = {
  inactivityMaximum: BigNumber;
  proofOfLife: BigNumber;
  succeeded: boolean;
  beneficiaries: readonly Beneficiary[];
  status: number;
};

export type TestamentCreationInfo = {
  selectedPlan: number;
  activeStep: number;
  beneficiaries: IBeneficiary[];
  expirationDays: number;
  signaturesRequired: number;
};

export type DynamicVault = {
  testament: Testament;
  backupAddresses: Address[];
  ESTABLISHMENT_FEE_RATE: BigNumber;
};

// utility types

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
