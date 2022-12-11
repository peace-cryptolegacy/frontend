import { BigNumber } from 'ethers';

export type UserPlans = (
  | 'Inheritance Plan'
  | 'Backup Wallet'
  | 'Expender Wallet'
  | 'Migration Wallet'
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
  tokens: readonly `0x${string}`[];
  status: number;
};

export type DynamicVault = {
  testament: Testament;
  backupAddresses: Address[];
  ESTABLISHMENT_FEE_RATE: BigNumber;
};
