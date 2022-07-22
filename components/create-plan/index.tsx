import { 
  Button, 
  ButtonGroup, 
  FormControl,
  FormHelperText,
  Heading,
  Input,
  Select,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack
} from '@chakra-ui/react';
import { addTestament, updateTestament } from 'utils/web3/heritage';
import { approve } from 'utils/web3/erc20';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { BigNumber, constants } from 'ethers';
import { getAllowance } from 'utils/web3/erc20';
import { getIsConnected, setTestator } from 'store/reducers/web3';
import { getTokensByChainId } from 'utils/tokens/index';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useTranslation } from 'next-i18next';
import isEmpty from 'lodash/isEmpty';
import noop from 'lodash/noop';
import styles from 'styles/CreatePlan.module.scss';
import Steps from 'components/steps';

import type { ITestament } from 'utils/web3/heritage';
import type { IToken } from 'utils/tokens/index';



const CreatePlan = () => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  return (
    <div className={styles['createplan']}>
      <div className={styles['createplan__title']}>
        Create new plan
      </div>

      <Steps />
    </div>
  );
}

export default CreatePlan;
