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
