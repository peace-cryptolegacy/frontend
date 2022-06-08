import { providers } from "ethers";
import Web3Modal from "web3modal";

const { Web3Provider } = providers;

type GetProvider = () => Promise<providers.Web3Provider>;

export const getProvider: GetProvider = async () => {
  const web3Modal: Web3Modal = new Web3Modal({
    providerOptions: {}
  });
  const instance: providers.ExternalProvider = await web3Modal.connect();

  return new Web3Provider(instance);
};
