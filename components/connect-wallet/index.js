import { Button } from '@chakra-ui/react';
import { getProvider } from 'utils/web3/provider';
import { setAddress } from 'store/reducers/web3';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function WalletConnectModal() {
  const [isConnecting, setConnect] = useState(false);

  const dispatch = useDispatch();
  const address = useSelector(state => state.web3.address);
  
  async function handleClick()  {
    try {
      setConnect(true);

      const provider = await getProvider();
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      dispatch(setAddress({ address }));
      setConnect(false);
    } catch (error) {
      console.log(error);        
      
      setConnect(false);
    }
  }
  
  return (
    <>
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
    </>
  )
}
