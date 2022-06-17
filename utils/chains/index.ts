const chains: Chain[] = require('utils/chains/chains.json');

interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

export interface Chain {
  name: string;
  chainId: number;
  isSupported: boolean;
  isTesnet: boolean;
  nativeCurrency: NativeCurrency;
  hexa: string;
  rpcs: string[];
  explorers: string[];
}

export function getChainById(id: number): Chain | undefined {
  return chains.find((chain: Chain) => {
    return chain.chainId === id;
  });
}

export function getChains(isSupported: boolean, isTesnet: boolean): Chain[] {
  return chains.filter((chain: Chain) => {
    return chain.isSupported === isSupported && chain.isTesnet === isTesnet;
  })!;
}
