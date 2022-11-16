import dynamicVaultContract from './dynamicVaultContract';
export default async function removeBeneficiaryMethod(id: any, backupAddress: any) {
    const response = await dynamicVaultContract.removeBeneficiary(id, backupAddress)
    return response;
  }