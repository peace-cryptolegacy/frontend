import dynamicVaultContract from './dynamicVaultContract';
export default async function createTestamentMethod(id: any, claimant: any,inactivity:any, beneficiaries:any) {
    const response = await dynamicVaultContract.createTestament(id, claimant, inactivity, beneficiaries)
    return response;
  }