import dynamicVaultContract from './dynamicVaultContract';
export default async function getTestamentParametersMethod(id:any) {
    const response = await dynamicVaultContract.getTestamentParameters(id)
    return response;
  }