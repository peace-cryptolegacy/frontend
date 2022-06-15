const tokens: Tokens = require('utils/tokens/tokens.json');

export interface Token {
  address: string;
  name: string;
  symbol: string;
}

export interface Tokens {
  [key: string]: Token[]
}

export function getTokensByChainId(id: number): Token[] {
  return tokens[id];
}

export function getTokenByAddress(chainId: number, address: string): Token | undefined {
  const tokens = getTokensByChainId(chainId);

  return tokens.find((token) => {
    return token.address === address;
  });
}
