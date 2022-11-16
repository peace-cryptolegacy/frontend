import { AddIcon } from "@chakra-ui/icons";
import { Button } from '@chakra-ui/react';
import { connect } from 'utils/web3/connect';
import { formatAddress } from 'utils/formatters';
import { getAddress } from 'store/reducers/web3';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useTranslation } from 'next-i18next';
import styles from 'styles/ConnectWallet.module.scss';
import RPC from "./ethersRPC"; // for using ethers.js
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { useEffect, useState } from "react";

const ConnectWallet = () => {
  const { t } = useTranslation('common');

  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );

const [account, setAccount] = useState<string>("")

  const clientId = "BA12UJ0cUUUMgOktGPzKGhhEDKpUhv-saej8fx8AZ8LJWsEwD7-zDiRPJwegeUsyicAcZ0ksFNYMNQCRxNTlazA";

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x507",
            rpcTarget: "https://rpc.api.moonbase.moonbeam.network/", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
          uiConfig: {
            theme: "dark",
            loginMethodsOrder: ["facebook", "google"],
            defaultLanguage: "en",
            appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
          },
        });

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "mandatory",
          },
          adapterSettings: {
            clientId,
            network: "mainnet",
            uxMode: "popup",
            whiteLabel: {
              name: "Your app Name",
              logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
              logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
              defaultLanguage: "en",
              dark: false, // whether to enable dark mode. defaultValue: false
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

  useEffect(()=>{
    provider?getAccounts().then(e=>setAccount(e)):"";
  },[provider])

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    getAccounts()
  };

  const getUserInfo = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getChainId = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const chainId = await rpc.getChainId();
    console.log(chainId);
  };
  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const address = await rpc.getAccounts();
    return address
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    console.log(balance);
  };

  const sendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const receipt = await rpc.sendTransaction();
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const signedMessage = await rpc.signMessage();
    console.log(signedMessage);
  };

  const getPrivateKey = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const privateKey = await rpc.getPrivateKey();
    console.log(privateKey);
  };

  const address: string = useAppSelector(getAddress);
  const isConnecting: boolean = useAppSelector(state => state.web3.isConnecting);

  const dispatch = useAppDispatch();
  
  function handleClick()  {
    connect(dispatch);
  }

  function renderWalletInfo() {
    return (
      <Button className={styles['connectwallet__user']} onClick={logout}>
        { formatAddress(account) }
      </Button>
    );
  }
 
  function renderConnectWallet() {
    return (
      <Button 
        backgroundColor="#5F4DFF"
        borderRadius={11}
        color='#FFFFFF' 
        fontSize={14}
        fontWeight={500}
        height='44px'
        isLoading={isConnecting} 
        leftIcon={<AddIcon />}
        onClick={login}
        width={200}
      >
        { t('connect-wallet.connect') }
      </Button>
    );
  }
  
  return (
    <div className={styles.connectwallet}>
      { provider ? renderWalletInfo() : renderConnectWallet() }
    </div>
  );
}

export default ConnectWallet;
