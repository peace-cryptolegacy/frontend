import dynamicVaultContract from './dynamicVaultContract';
export default async function addBackupMethod(id: any, backupAddress: any) {
    const response = await dynamicVaultContract.addBackup(id, backupAddress)
    return response;
  }