import { Button } from '@chakra-ui/react';
import { getAddress, setAddress } from 'store/reducers/web3';
import { getProvider } from 'utils/web3/provider';
import { providers } from "ethers";
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useState, FC } from 'react';

const WalletConnectModal: FC = () => {
  const [isConnecting, setConnect] = useState<boolean>(false);

  const address: string = useAppSelector(getAddress);
  const dispatch = useAppDispatch();
  
  async function handleClick()  {
    try {
      setConnect(true);

      const provider: providers.Web3Provider = await getProvider();
      const signer: providers.JsonRpcSigner = provider.getSigner();
      const address: string = await signer.getAddress();

      dispatch(setAddress({ address }));
      setConnect(false);
    } catch (error) {
      console.log(error);        
      
      setConnect(false);
    }
  }
  
  return (
    <div>
      {
        address ? 
          <div>
            { address }
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
