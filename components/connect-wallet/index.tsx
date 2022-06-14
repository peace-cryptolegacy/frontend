import { BigNumber } from 'ethers';
import { Button } from '@chakra-ui/react';
import { formatAddress } from 'utils/formatters';
import { getAddress, getBalance, getChainInfo, setProvider, setTestator } from 'store/reducers/web3';
import { getProvider } from 'utils/web3/provider';
import { getTestator } from "utils/web3/heritage";
import { providers } from "ethers";
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useState, FC } from 'react';
import { useTranslation } from 'next-i18next';
import styles from 'styles/ConnectWallet.module.scss';

import type { Chain } from 'utils/chains/index';
import type { ITestator } from 'utils/web3/heritage';

const WalletConnectModal: FC = () => {
  const { t } = useTranslation('common');
  const [isConnecting, setConnect] = useState<boolean>(false);

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
      const testator: ITestator | undefined = await getTestator(address);

      if (testator) {
        dispatch(setTestator(testator));  
      }

      dispatch(setProvider({ 
        address, 
        balance
      }));
      setConnect(false);
    } catch (error) {
      alert(error);        
      
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

export default WalletConnectModal;
