import { BigNumber } from 'ethers';
import { changeNetwork, getProvider } from 'utils/web3/provider';
import { setInheritor, setProvider, setTestator } from 'store/reducers/web3';
import { getInheritor, getTestator } from 'utils/web3/heritage';
import { providers } from 'ethers';
import { useAppDispatch } from 'store/hooks';

import type { Chain } from 'utils/chains/index';
import type { ITestament } from 'utils/web3/heritage';

export async function connect({ chain, selectedChain }: { chain: Chain, selectedChain: number }) {
  try {
    const dispatch = useAppDispatch();

    const provider: providers.Web3Provider = await getProvider();
    const signer: providers.JsonRpcSigner = provider.getSigner();

    if (!chain?.isSupported) {
      await changeNetwork(selectedChain);

      throw null;
    }

    const address: string = await signer.getAddress();
    const balance: BigNumber = await signer.getBalance();

    try {
      const testator: ITestament | undefined = await getTestator(address);

      if (testator) {
        dispatch(setTestator(testator));
      }
    } catch (error) { }

    try {
      const inheritor: ITestament | undefined = await getInheritor(address);

      if (inheritor) {
        dispatch(setInheritor(inheritor));
      }
    } catch (error) { }

    dispatch(setProvider({
      address,
      balance
    }));
  } catch (error) {
    throw error;
  }
}
