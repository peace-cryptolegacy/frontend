import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';

export const web3auth = new Web3Auth({
  clientId:
    'BBoPmFxNLEMBVbWx7SCIHceMuvUh7nmvwGtc_8vD3MlYuvpOAkO2uy6jTrdCFfshWcKuZHQ5YU-S5o0Ykjv4nz4', // Get your Client ID from Web3Auth Dashboard
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: '0x1',
    rpcTarget: 'https://polygon-testnet.public.blastapi.io',
    // rpcTarget: 'https://rpc.ankr.com/eth', // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
  },
  uiConfig: {
    theme: 'light',
    loginMethodsOrder: ['facebook', 'google'],
    appLogo: 'https://yourpeace.io/images/Logo-New.svg', // Your App Logo Here
  },
});

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    clientId:
      'BBoPmFxNLEMBVbWx7SCIHceMuvUh7nmvwGtc_8vD3MlYuvpOAkO2uy6jTrdCFfshWcKuZHQ5YU-S5o0Ykjv4nz4',
    network: 'testnet',
    uxMode: 'popup',
    loginConfig: {
      // Add login configs corresponding to the providers on modal
      // Google login
      google: {
        name: 'Custom Google Auth Login',
        verifier: 'peace-google-testnet', // Please create a verifier on the developer dashboard and pass the name here
        typeOfLogin: 'google', // Pass on the login provider of the verifier you've created
        clientId:
          '641523513641-hgq1fm27aml5616fa1diu3qntdknmgsc.apps.googleusercontent.com', // Pass on the clientId of the login provider here - Please note this differs from the Web3Auth ClientID. This is the JWT Client ID
      },
      // Facebook login
      facebook: {
        name: 'Custom Facebook Auth Login',
        verifier: 'peace-facebook-testnet', // Please create a verifier on the developer dashboard and pass the name here
        typeOfLogin: 'facebook', // Pass on the login provider of the verifier you've created
        clientId: '521625433010066', // Pass on the clientId of the login provider here - Please note this differs from the Web3Auth ClientID. This is the JWT Client ID
      },
      // Add other login providers here
    },
  },
});
web3auth.configureAdapter(openloginAdapter);

web3auth.initModal();
