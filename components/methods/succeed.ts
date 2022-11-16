import dynamicVaultContract from './dynamicVaultContract';
export default async function succeedMethod(id:any) {
    const signalLife = await dynamicVaultContract.succeed(id)
    return signalLife;
  }