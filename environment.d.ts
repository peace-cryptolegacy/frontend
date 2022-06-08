declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_HERITAGE_CONTRACT_ADDRESS: string;
      NEXT_PUBLIC_MOCK_TOKEN_ADDRESS: string;
    }
  }
}

export { }
