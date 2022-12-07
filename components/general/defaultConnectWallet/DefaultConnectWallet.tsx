import { SafeEventEmitterProvider } from '@web3auth/base';
import { Web3Auth } from '@web3auth/modal';
import Button from 'components/button/Button';
import Stack from 'components/stack/Stack';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { MetamaskAdapter } from '@web3auth/metamask-adapter';
import RPC from '../../../pages/api/web3RPC'; // for using web3.js
type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const GeneralDefaultConnectWallet = ({ children }: Props) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

  const clientId =
    'BBoPmFxNLEMBVbWx7SCIHceMuvUh7nmvwGtc_8vD3MlYuvpOAkO2uy6jTrdCFfshWcKuZHQ5YU-S5o0Ykjv4nz4';

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId, // Get your Client ID from Web3Auth Dashboard
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x1',
            // rpcTarget: 'https://rpc.api.moonbeam.network',
            // rpcTarget: 'https://polygon-testnet.public.blastapi.io',
            rpcTarget: 'https://rpc.ankr.com/eth', // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
          },
          uiConfig: {
            theme: 'light',
            loginMethodsOrder: ['facebook', 'google'],
            appLogo: 'https://yourpeace.io/images/Logo-New.svg', // Your App Logo Here
          },
        });

        // adding metamask adapter
        const metamaskAdapter = new MetamaskAdapter({
          clientId,
        });

        // it will add/update  the metamask adapter in to web3auth class
        web3auth.configureAdapter(metamaskAdapter);

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            clientId, // Get your Client ID from Web3Auth Dashboard
            network: 'testnet',
            uxMode: 'popup',
            whiteLabel: {
              name: 'PEACE',
              logoLight: 'https://yourpeace.io/images/Logo-New.svg',
              logoDark: 'https://yourpeace.io/images/Logo-New.svg',
              defaultLanguage: 'en',
              dark: true, // whether to enable dark mode. defaultValue: false
            },
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

        setWeb3auth(web3auth);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    console.log(provider);
    console.log('Logged in Successfully!');
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const idToken = await web3auth.authenticateUser();
    console.log(idToken);
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
    console.log('web3auth');
    console.log(web3auth);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    console.log(address);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log('provider not initialized yet');
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };

  return (
    <Stack className="min-h-screen items-center justify-center !gap-9 text-center">
      {children}
      <div className="space-y-3">
        <Button
          onClick={async () => await login()}
          variant="fancy"
          text="Connect Wallet"
          size="base"
        />
        <Button
          onClick={async () => await authenticateUser()}
          variant="fancy"
          text="authenticateUser"
          size="base"
        />
        <Button
          onClick={async () => await getUserInfo()}
          variant="fancy"
          text="getUserInfo"
          size="base"
        />
        <Button
          onClick={async () => await getChainId()}
          variant="fancy"
          text="getChainId"
          size="base"
        />
        <Button
          onClick={async () => await getAccounts()}
          variant="fancy"
          text="getAccounts"
          size="base"
        />
        <Button
          onClick={async () => await getBalance()}
          variant="fancy"
          text="getBalance"
          size="base"
        />
        <Button
          onClick={async () => await sendTransaction()}
          variant="fancy"
          text="sendTransaction"
          size="base"
        />
        <Button
          onClick={async () => await signMessage()}
          variant="fancy"
          text="signMessage"
          size="base"
        />
        <Button
          onClick={async () => await getPrivateKey()}
          variant="fancy"
          text="getPrivateKey"
          size="base"
        />
        <Button
          onClick={async () => await logout()}
          variant="fancy"
          text="logout"
          size="base"
        />
        <Stack direction="row" className="justify-center">
          <span>Secured by</span>
          <div className="relative h-8 w-24">
            <Image
              src="/logos/web3auth.png"
              alt="Web3Auth"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Stack>
      </div>
    </Stack>
  );
};

export default GeneralDefaultConnectWallet;
