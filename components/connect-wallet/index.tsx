import { BigNumber } from 'ethers';
import { Button } from '@chakra-ui/react';
import { formatAddress } from 'utils/formatters';
import { getAddress, getBalance, getChainInfo, setInheritor, setProvider, setTestator } from 'store/reducers/web3';
import { getProvider } from 'utils/web3/provider';
import { getInheritor, getTestator } from "utils/web3/heritage";
import { providers } from "ethers";
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import styles from 'styles/ConnectWallet.module.scss';
import { useRouter } from 'next/router';

import type { Chain } from 'utils/chains/index';
import type { ITestament } from 'utils/web3/heritage';

const ConnectWallet = () => {
  const { t } = useTranslation('common');
  const [isConnecting, setConnect] = useState<boolean>(false);
  const router = useRouter();

  const address: string = useAppSelector(getAddress);
  const chainInfo: Chain | undefined = useAppSelector(getChainInfo);
  const balance: string = useAppSelector(getBalance);
  const dispatch = useAppDispatch();
  
  async function handleClick()  {
    try {
      setConnect(true);

      const provider: providers.Web3Provider = await getProvider();
      const signer: providers.JsonRpcSigner = provider.getSigner();
      const address: string = await signer.getAddress();
      const balance: BigNumber = await signer.getBalance();

      try {
        const testator: ITestament | undefined = await getTestator(address);
      
        if (testator) {
          dispatch(setTestator(testator));  
        }  
      } catch (error) {}

      try {
        const inheritor: ITestament | undefined = await getInheritor(address);

        if (inheritor) {
          dispatch(setInheritor(inheritor));  
          
          router.push('/claim');
        }    
      } catch (error) {}

      dispatch(setProvider({ 
        address, 
        balance
      }));
      setConnect(false);
    } catch (error) {
      setConnect(false);
    }
  }
  
  return (
    <div className={styles.connectwallet}>
      {
        address ? 
          <div className={styles['connectwallet__user']}>
            <div className={styles['connectwallet__user__balance']}>
              { balance } { chainInfo?.nativeCurrency.symbol.toUpperCase() }
            </div>
            <div className={styles['connectwallet__user__address']}>
              { formatAddress(address) }
            </div>
          </div> : 
          <Button 
            colorScheme='blue' 
            disabled={ !chainInfo?.isSupported }
            height='44px'
            isLoading={ isConnecting } 
            onClick={ handleClick }
          >
            { t('connect-wallet.connect') }
          </Button>
      }
    </div>
  );
}

export default ConnectWallet;
