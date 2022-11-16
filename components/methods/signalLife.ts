import dynamicVaultContract from './dynamicVaultContract';
export default async function signalLifeMethod(id:any) {
    const signalLife = await dynamicVaultContract.signalLife(id)
    return signalLife;
  }