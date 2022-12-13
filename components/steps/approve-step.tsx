import { Box, Button, Input } from '@chakra-ui/react';
import tokens from 'data/tokens.json';
import Image from 'next/image';
import styles from 'styles/ApproveStep.module.scss';

type props = {
  onNextStep: Function;
  onPrevStep: Function;
};

type Token = {
  address: string;
  icon: string;
  name: string;
  symbol: string;
};

const ApproveStep = ({ onNextStep, onPrevStep }: props) => {
  function renderToken({ icon, name, symbol }: Token) {
    return (
      <Box flex="50%" key={symbol} marginBottom={5}>
        <Box
          alignContent="center"
          display="flex"
          flexDirection="row"
          maxWidth="70%"
        >
          <Box flex={1}>
            <Image height="32px" src={icon} width="32px" alt="token" />
          </Box>

          <Box flex={2}>
            <div className={styles['approvestep__token__name']}>{name}</div>
            <div className={styles['approvestep__token__symbol']}>{symbol}</div>
          </Box>

          <Box flex={1}>
            <Button
              backgroundColor="#5F4DFF"
              borderRadius={8}
              color="#FFFFFF"
              fontWeight={500}
              height="32px"
              width={136}
            >
              Approve token
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <div className={styles['approvestep']}>
      <Box className={styles['approvestep__disclaimer']}>
        <div>
          Your inheritance will only include the tokens that you would like to
          transfer. You will need to add and approve the expense of each token
          to let your heir claim after the inactivity time passed.{' '}
        </div>
        <br />
        <div>You can add the contract address or search on the token list.</div>
      </Box>

      <div className={styles['approvestep__divider']}></div>

      <Box padding="0 85px 0 85px">
        <Input height="50px" placeholder="Search name or paste address" />
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        padding="30px 100px 0 100px"
      >
        {tokens.map(renderToken)}
      </Box>

      <div className={styles['approvestep__divider']}></div>

      <Box display="flex" flexDirection="row" justifyContent="center">
        <Button
          color="#5F4DFF"
          fontSize="14px"
          marginRight="80px"
          onClick={() => onPrevStep()}
          variant="ghost"
        >
          Back
        </Button>

        <Button
          backgroundColor="#5F4DFF"
          color="#FFFFFF"
          onClick={() => onNextStep()}
          width="180px"
        >
          Continue
        </Button>
      </Box>
    </div>
  );
};

export default ApproveStep;
