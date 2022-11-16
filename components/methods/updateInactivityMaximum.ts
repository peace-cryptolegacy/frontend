import dynamicVaultContract from './dynamicVaultContract';
export default async function updateInactivityMaximumMethod(id: any, newMax: any) {
    const response = await dynamicVaultContract.updateInactivityMaximum(id, newMax)
    return response;
  }