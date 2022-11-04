const tokens: ITokens = require('utils/tokens/tokens.json');

export interface IToken {
  address: string;
  name: string;
  symbol: string;
}

export interface ITokens {
  [key: string]: IToken[];
}

export function getTokensByChainId(id: number): IToken[] {
  return tokens[id];
}

export function getTokenByAddress(
  chainId: number,
  address: string
): IToken | undefined {
  const tokens = getTokensByChainId(chainId);

  return tokens.find((token) => {
    return token.address === address;
  });
}

export interface Token {
  address: string;
  name: string;
  symbol: string;
}

export interface Tokens {
  [key: string]: Token[];
}
