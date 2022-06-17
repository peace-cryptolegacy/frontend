import { getChainById } from 'utils/chains/index';
import { providers } from 'ethers';
import Web3Modal from 'web3modal';

const { Web3Provider } = providers;

type GetProvider = () => Promise<providers.Web3Provider>;

export const getProvider: GetProvider = async () => {
  const web3Modal: Web3Modal = new Web3Modal({
    providerOptions: {}
  });
  const instance: providers.ExternalProvider = await web3Modal.connect();

  return new Web3Provider(instance);
};

export const changeNetwork = async (chainId: number) => {
  const chain = getChainById(chainId);

  if (!chain) return;

  const networkConfig = {
    chainId: chain.hexa,
    chainName: chain.name,
    rpcUrls: chain.rpcs,
    blockExplorerUrls: chain.explorers,
    nativeCurrency: {
      name: chain.nativeCurrency.name,
      symbol: chain.nativeCurrency.symbol,
      decimals: chain.nativeCurrency.decimals
    }
  };

  const web3Wrapper = await getProvider();

  await web3Wrapper.send('wallet_addEthereumChain', [networkConfig]);
}
