import dynamicVaultContract from './dynamicVaultContract';
export default async function updateBeneficiaryMethod(id: any, beneficiary: any,percent:any) {
    const response = await dynamicVaultContract.updateBeneficiary(id, beneficiary,percent)
    return response;
  }