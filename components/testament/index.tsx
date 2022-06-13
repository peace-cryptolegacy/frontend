import { BigNumber } from 'ethers';
import { Box, Button, Heading, Progress, Text } from '@chakra-ui/react';
import { setTestator } from 'store/reducers/web3';
import { updateProof } from 'utils/web3/heritage';
import { useAppDispatch } from 'store/hooks';
import { useState } from 'react';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import hoursToMinutes from 'date-fns/hoursToMinutes';
import styles from 'styles/Testament.module.scss';

import type { ITestator } from 'utils/web3/heritage';

const Testament = ({ testator }: { testator: ITestator }) => {
  const [isUpdatingProof, setUpdatingProof] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const proofOfTimestamp = fromUnixTime(Number(testator.proofOfTimestamp.toString()));
  const timePassed = differenceInMinutes(new Date(), proofOfTimestamp);
  const maxHours = (testator.maxDays) * hoursToMinutes(24);

  async function handleUpdateProofButtonClick() {
    try {
      setUpdatingProof(true);

      await updateProof();

      dispatch(setTestator({ 
        ...testator, 
        proofOfTimestamp: BigNumber.from(getUnixTime(Date.now()))
      }));  
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingProof(false)
    }
  }
  
  return (
    <div className={ styles.testament }>
      <Heading as='h1' size='lg' mb='10'>
        Testamento
      </Heading>

      <Text fontSize='xl' fontWeight='bold'>
        Estado
      </Text>

      <Box mb={ 5 }>
        { testator.status}
      </Box>

      <Text fontSize='xl' fontWeight='bold'>
        Heredero
      </Text>

      <Box mb={ 5 }>
        { testator.inheritor }
      </Box>

      <Text fontSize='xl' fontWeight='bold'>
        Token
      </Text>

      <Box mb={ 5 }>
        { testator.token}
      </Box>

      <Text fontSize='xl' fontWeight='bold'>
        Ultima prueba de vida
      </Text>

      <Box mb={ 5 }>
        { proofOfTimestamp.toString() } 
      </Box>

      <Box className={ styles['testament__progress'] } mb={ 5 }>
        <Progress mb={ 2 } value={ timePassed } max={ maxHours } />

        <div className={ styles['testament__progress__days'] }>
          <div>0 días</div>
          <div>{ testator.maxDays } días</div>
        </div>
      </Box>


      <div className={ styles['testament__update__proof']}>
        <Button
          colorScheme='blue' 
          isLoading={ isUpdatingProof }
          onClick={ handleUpdateProofButtonClick }
        >
          Actualizar prueba de vida
        </Button>
      </div>
    </div>
  );
}

export default Testament;
