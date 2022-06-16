import { Box, Progress, Text } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import fromUnixTime from 'date-fns/fromUnixTime';
import hoursToMinutes from 'date-fns/hoursToMinutes';
import styles from 'styles/LifeProof.module.scss';

import type { ITestament } from 'utils/web3/heritage';

type props = {
  testator: ITestament;
}

const LifeProof = ({ testator } : props) => {
  const { t } = useTranslation('common');
  const proofOfTimestamp = fromUnixTime(Number(testator.proofOfTimestamp.toString()));
  const timePassed = differenceInMinutes(new Date(), proofOfTimestamp);
  const maxHours = (testator.maxDays) * hoursToMinutes(24);
  
  return (
    <div>
      <Text fontSize='xl' fontWeight='bold'>
        { t('testament.life-proof') }
      </Text>

      <Box mb={ 5 }>
        { proofOfTimestamp.toString() } 
      </Box>

      <Box className={ styles['lifeproof__progress'] } mb={ 5 }>
        <Progress mb={ 2 } value={ timePassed } max={ maxHours } />

        <div className={ styles['lifeproof__progress__days'] }>
          <div>{ t('testament.days', { days: 0 }) }</div>
          <div>{ t('testament.days', { days: testator.maxDays }) }</div>
        </div>
      </Box>
    </div>
  );
}

export default LifeProof;
