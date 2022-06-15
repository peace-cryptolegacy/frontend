import { Box, Button, Heading, Progress, Text } from '@chakra-ui/react';
import { getTokenByAddress } from 'utils/tokens';
import { setTestator } from 'store/reducers/web3';
import { Status, inherit, updateProof } from 'utils/web3/heritage';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import fromUnixTime from 'date-fns/fromUnixTime';
import hoursToMinutes from 'date-fns/hoursToMinutes';
import styles from 'styles/Testament.module.scss';

import type { ITestament } from 'utils/web3/heritage';
import type { Token } from 'utils/tokens';

const Testament = ({ isInheritor, isTestator, testator }: { isInheritor?: boolean, isTestator?: boolean, testator: ITestament }) => {
  const { t } = useTranslation('common');
  const [isInheriting, setIsInheriting] = useState<boolean>(false);
  const [isUpdatingProof, setUpdatingProof] = useState<boolean>(false);
  
  const dispatch = useAppDispatch();

  const proofOfTimestamp = fromUnixTime(Number(testator.proofOfTimestamp.toString()));
  const timePassed = differenceInMinutes(new Date(), proofOfTimestamp);
  const maxHours = (testator.maxDays) * hoursToMinutes(24);
  const chainId: number = useAppSelector(state => state.web3.chainId);
  const token: Token | undefined = getTokenByAddress(chainId, testator.token);

  async function handleInheritButtonClick() {
    try {
      setIsInheriting(true);

      await inherit();
    } catch (error) {
    } finally {
      setIsInheriting(false);
    }
  }

  async function handleUpdateProofButtonClick() {
    try {
      setUpdatingProof(true);

      const result = await updateProof();

      if (result !== undefined) {
        dispatch(setTestator({ 
          ...testator, 
          status: result.status,
          proofOfTimestamp: result.proofOfTimestamp
        }));
      }
    } catch (error) {
    } finally {
      setUpdatingProof(false)
    }
  }
  
  return (
    <div className={ styles.testament }>
      <Heading as='h1' size='lg' mb='10'>
        { t('testament.title') }
      </Heading>

      <Text fontSize='xl' fontWeight='bold'>
        { t('testament.status') }
      </Text>

      <Box mb={ 5 }>
        { Status[Number(testator.status)] }
      </Box>

      <Text fontSize='xl' fontWeight='bold'>
        { t('testament.inheritor') }
      </Text>

      <Box mb={ 5 }>
        { testator.inheritor }
      </Box>

      <Text fontSize='xl' fontWeight='bold'>
        { t('testament.token') }
      </Text>

      <Box mb={ 5 }>
        <div>{ token?.name }</div>
        <div>{ testator.token}</div>
      </Box>

      {
        isTestator ? 
          <div>
            <Text fontSize='xl' fontWeight='bold'>
              { t('testament.life-proof') }
            </Text>

            <Box mb={ 5 }>
              { proofOfTimestamp.toString() } 
            </Box>

            <Box className={ styles['testament__progress'] } mb={ 5 }>
              <Progress mb={ 2 } value={ timePassed } max={ maxHours } />

              <div className={ styles['testament__progress__days'] }>
                <div>{ t('testament.days', { days: 0 }) }</div>
                <div>{ t('testament.days', { days: testator.maxDays }) }</div>
              </div>
            </Box>
          </div> : 
          null
      }

      <div className={ styles['testament__update__proof']}>
        {
          isTestator ?
          <Button
            colorScheme='blue' 
            isLoading={ isUpdatingProof }
            onClick={ handleUpdateProofButtonClick }
          >
            { t('testament.update-proof') }
          </Button> : 
          null
        }

        {
          isInheritor ?
          <Button
            colorScheme='blue' 
            isLoading={ isInheriting }
            onClick={ handleInheritButtonClick }
          >
            { t('testament.claim') }
          </Button> : 
          null
        }
      </div>
    </div>
  );
}

export default Testament;
