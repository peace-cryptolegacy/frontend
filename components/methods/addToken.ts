import dynamicVaultContract from './dynamicVaultContract';
export default async function addTokenMethod(id: any, tokenAddress: any) {
    const response = await dynamicVaultContract.addToken(id, tokenAddress)
    return response;
  }