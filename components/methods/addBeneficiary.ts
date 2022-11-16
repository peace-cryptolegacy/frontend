import dynamicVaultContract from './dynamicVaultContract';
export default async function addBeneficiaryMethod(id: any, backupAddress: any) {
    const response = await dynamicVaultContract.addBeneficiary(id, backupAddress)
    return response;
  }