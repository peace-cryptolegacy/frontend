import { BigNumber, providers } from 'ethers';
import { setIsConnecting, setProvider } from 'store/reducers/web3';
import { changeNetwork, getProvider } from 'utils/web3/provider';

import type { AppDispatch } from 'store';

const supportedChainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

export async function connect(dispatch: AppDispatch) {
  try {
    const provider: providers.Web3Provider = await getProvider();
    const signer: providers.JsonRpcSigner = provider.getSigner();
    const chainId = await signer.getChainId();

    if (chainId !== supportedChainId) {
      await changeNetwork(supportedChainId);
    }

    dispatch(setIsConnecting(true));

    const address: string = await signer.getAddress();
    const balance: BigNumber = await signer.getBalance();

    // try {
    //   const testator: ITestament | undefined = await getTestator(address);

    //   if (testator) {
    //     dispatch(setTestator(testator));
    //   }
    // } catch (error) { }

    // try {
    //   const inheritor: ITestament | undefined = await getInheritor(address);

    //   if (inheritor) {
    //     dispatch(setInheritor(inheritor));
    //   }
    // } catch (error) { }

    dispatch(
      setProvider({
        address,
        balance,
      })
    );
    dispatch(setIsConnecting(false));
  } catch (error) {
    dispatch(setIsConnecting(false));

    throw error;
  }
}
