import dynamicVaultContract from './dynamicVaultContract';
export default async function dynamicVaultMethod(id:any) {
    const signalLife = await dynamicVaultContract.dynamicVaults(id)
    return signalLife;
  }