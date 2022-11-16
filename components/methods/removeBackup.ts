import dynamicVaultContract from './dynamicVaultContract';
export default async function removeRemoveMethod(id: any, backupAddress: any) {
    const response = await dynamicVaultContract.removeBackup(id, backupAddress)
    return response;
  }