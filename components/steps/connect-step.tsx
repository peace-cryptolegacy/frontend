import { Button, Box } from '@chakra-ui/react';
import { connect } from 'utils/web3/connect';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Image from 'next/image';
import styles from 'styles/ConnectStep.module.scss';

type props = {
  onNextStep: Function;
}

const ConnectStep = ({ onNextStep }: props) => {
  const isConnecting: boolean = useAppSelector(state => state.web3.isConnecting);

  const dispatch = useAppDispatch();
  
  async function handleClick()  {
    await connect(dispatch);

    onNextStep(1);
  }

  return (
    <div className={styles['connectstep']}>
      <div className={styles['connectstep__disclaimer']}>
        In order to create your plan, you need to select the network
      </div>

      <div className={styles['connectstep__container']}>
        <span className={styles['connectstep__container__text']}>
          Creating your plan on
        </span>

        <Box
          alignItems='center'
          as='button' 
          backgroundColor='#FFFFFF'
          border='1px solid #E2E8F0'
          borderRadius={ 11 }
          boxShadow='0px 5px 15px 5px rgba(0,0,0,0.05)'
          display='flex'
          flexDirection='row'
          marginTop={1}
          mr='20px'
          padding='5px 20px'
        >
          <Image 
            alt='AVAX Logo' 
            height='35px' 
            src='/logos/avax.svg' 
            width='35px' 
          />
          <Box
            fontSize='14px'
            letterSpacing='0.25px'
            marginLeft='18px'
          >
            Avalanche
          </Box>
        </Box>
      </div>


      <div className={styles['connectstep__divider']}></div>

      <div className={styles['connectstep__button__container']}>
        <Button 
          backgroundColor="#5F4DFF"
          borderRadius={5}
          color='#FFFFFF' 
          fontSize={14}
          fontWeight={500}
          height='48px'
          isLoading={isConnecting} 
          onClick={handleClick}
          width={320}
        >
          Sign via web3 wallet
        </Button>
      </div>

      <div className={styles['connectstep__disclaimer']}>
        By connecting a wallet, you agree to Peace Labs Terms of Service and acknowledge that you have read and understand the Peace Protocol Disclaimer.
      </div>
    </div>
  );
}

export default ConnectStep;
