import { BigNumber } from 'ethers';
import { Button } from '@chakra-ui/react';
import { formatAddress } from 'utils/formatters';
import { getAddress, getBalance, setProvider } from 'store/reducers/web3';
import { getProvider } from 'utils/web3/provider';
import { providers } from "ethers";
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useState, FC } from 'react';
import styles from 'styles/ConnectWallet.module.scss';

const WalletConnectModal: FC = () => {
  const [isConnecting, setConnect] = useState<boolean>(false);

  const address: string = useAppSelector(getAddress);
  const balance: string = useAppSelector(getBalance);
  const dispatch = useAppDispatch();
  
  async function handleClick()  {
    try {
      setConnect(true);

      const provider: providers.Web3Provider = await getProvider();
      const signer: providers.JsonRpcSigner = provider.getSigner();
      const address: string = await signer.getAddress();
      const balance: BigNumber = await signer.getBalance();

      dispatch(setProvider({ 
        address, 
        balance: balance.toString()
      }));
      setConnect(false);
    } catch (error) {
      console.log(error);        
      
      setConnect(false);
    }
  }
  
  return (
    <div className={styles.connectwallet}>
      {
        address ? 
          <div className={styles['connectwallet__user']}>
            <div className={styles['connectwallet__user__balance']}>
              { balance } ETH
            </div>
            <div className={styles['connectwallet__user__address']}>
              { formatAddress(address) }
            </div>
          </div> : 
          <Button 
            colorScheme='blue' 
            isLoading={isConnecting} 
            onClick={handleClick}
          >
            Connect wallet
          </Button>
      }
    </div>
  );
}

export default WalletConnectModal;
