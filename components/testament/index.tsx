import { Box, Heading, Text } from '@chakra-ui/react';
import { getTokenByAddress } from 'utils/tokens';
import { Status } from 'utils/web3/heritage';
import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'next-i18next';
import InheritorActions from 'components/testament/inheritor-actions';
import LifeProof from 'components/testament/life-proof';
import styles from 'styles/Testament.module.scss';
import TestatorActions from 'components/testament/testator-actions';

import type { ITestament } from 'utils/web3/heritage';
import type { Token } from 'utils/tokens';

type props = {
  isInheritor?: boolean; 
  isTestator?: boolean; 
  testator: ITestament;
}

const Testament = ({ isInheritor, isTestator, testator }: props) => {
  const { t } = useTranslation('common');

  const chainId: number = useAppSelector(state => state.web3.chainId);
  const token: Token | undefined = getTokenByAddress(chainId, testator.token);
  
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

      { isTestator ? <LifeProof testator={ testator } /> : null }

      <div className={ styles['testament__update__proof']}>
        { isTestator ? <TestatorActions testator={ testator } /> : null }
        { isInheritor ? <InheritorActions testator={ testator } /> : null }
      </div>
    </div>
  );
}

export default Testament;
