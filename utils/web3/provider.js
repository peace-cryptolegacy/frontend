import { Web3Provider } from "@ethersproject/providers";
import Web3Modal from "web3modal";

export const getProvider = async () => {
  const web3Modal = new Web3Modal({
    providerOptions: {}
  });
  const instance = await web3Modal.connect();

  return new Web3Provider(instance);
};
