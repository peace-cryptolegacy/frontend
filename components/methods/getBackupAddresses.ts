import dynamicVaultContract from './dynamicVaultContract';
export default async function getBackupAddressesMethod(id:any) {
    const response = await dynamicVaultContract.getBackupAddresses(id)
    return response;
  }