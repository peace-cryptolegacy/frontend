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

import type { ITestament } from 'utils/web3/heritage';
import type { IToken } from 'utils/tokens/index';

type props = {
  createMode?: boolean;
  onAccept?: Function;
  testator?: ITestament;
}

const CreatePlan = ({ createMode, onAccept = noop, testator }: props) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const isConnected: boolean = useAppSelector(getIsConnected);
  const chainId: number = useAppSelector(state => state.web3.chainId);

  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isCreatingTestament, setIsCreatingTestament] = useState<boolean>(false);
  const [inheritor, setInheritor] = useState<string>(testator?.inheritor || '');
  const [token, setToken] = useState<string>(testator?.token || '');
  const [maxDays, setMaxDays] = useState<number>(testator?.maxDays || 1);
  const [hasAllowance, setHasAllowance] = useState<boolean>(false);

  const tokens: IToken[] = getTokensByChainId(chainId);
  const title = createMode ? t('create-plan.title-create') : t('create-plan.title-edit');
  const action = createMode ? t('create-plan.create-testament') : t('create-plan.edit-testament');

  useEffect(() => {
    if (testator) {
      const event = {
        currentTarget: {
          value: testator.token
        } 
      } as BaseSyntheticEvent;

      handleTokenChange(event);
    }
  }, []);

  async function handleApproveButtonClick() {
    try {
      setIsApproving(true);

      await approve(token);

      const allowance: BigNumber = await getAllowance(token);

      setHasAllowance(allowance.eq(constants.MaxUint256));
    } catch (error) {
      alert(error);
    } finally {
      setIsApproving(false)
    }
  }

  async function handleCreateTestamentButtonClick() {
    try {
      setIsCreatingTestament(true);

      const action = createMode ? addTestament : updateTestament;

      const testator = await action(inheritor, maxDays, token);

      if (testator) {
        dispatch(setTestator(testator));  
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsCreatingTestament(false);

      onAccept();
    }
  }

  function handleSliderChange(maxDays: number) {
    setMaxDays(maxDays);
  }

  async function handleTokenChange(event: BaseSyntheticEvent) {
    const token = event.currentTarget.value;
    
    setToken(token);
    
    try {
      const allowance: BigNumber = await getAllowance(token);

      setHasAllowance(allowance.eq(constants.MaxUint256));
    } catch (error) {}
  }

  return (
    <div className={styles.createplan}>
      <FormControl mb='10'>
        <FormHelperText mb='5'>
        { t('create-plan.max-days-hint') }
        </FormHelperText>

        <Slider 
          defaultValue={ 1 } 
          isDisabled={ !isConnected }
          max={ 7 } 
          // max={60} 
          mb='10'
          // min={30} 
          min={ 1 } 
          onChange={ handleSliderChange }
          // step={15} 
          step={ 1 }
          value={maxDays} 
        >
          {/* <SliderMark value={30} mt='2' ml='-2.5' fontSize='sm'>
            { t('create-plan.days', { days: 30 }) }
          </SliderMark>
          <SliderMark value={45} mt='2' ml='-2.5' fontSize='sm'>
            { t('create-plan.days', { days: 45 }) }
          </SliderMark>
          <SliderMark value={60} mt='2' ml='-10' fontSize='sm' style={{ whiteSpace: 'nowrap' }}>
          { t('create-plan.days', { days: 60 }) }
          </SliderMark> */}

          <SliderMark value={1} mt='2' ml='-2.5' fontSize='sm'>
            { t('create-plan.days', { days: 1 }) }
          </SliderMark>
          <SliderMark value={7} mt='2' ml='-10' fontSize='sm' style={{ whiteSpace: 'nowrap' }}>
          { t('create-plan.days', { days: 7 }) }
          </SliderMark>

          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          
          <SliderThumb />
        </Slider>

        <FormHelperText mb='5'>
          { t('create-plan.beneficiary-hint') }
        </FormHelperText>

        <Input 
          disabled={ !isConnected }
          id='inheritor' 
          mb='5'
          onChange={ (event: BaseSyntheticEvent) => setInheritor(event.currentTarget.value)}
          placeholder={ t('create-plan.wallet-address') }
          type='string' 
          value={ inheritor }
        />

        <FormHelperText mb='5'>
          { t('create-plan.token-hint') }
        </FormHelperText>

        <Select 
          onChange={ handleTokenChange }
          placeholder={t('create-plan.token-address')}
          value={ token }
        >
          { 
            isEmpty(tokens) ? 
            null :
            tokens.map(token => {
              return (
                <option key={ token.address } value={ token.address }>
                  { token.name }
                </option>
              );
            })
          }
        </Select>
      </FormControl>

      <ButtonGroup className={styles['createplan--submitbuttons']} gap='4'>
        <Button 
          colorScheme='blue' 
          disabled={ !isConnected || token === '' } 
          isLoading={ isApproving }
          onClick={ handleApproveButtonClick }
        >
          { t('create-plan.approve-allowance') }
        </Button>
        <Button 
          colorScheme='blue'
          disabled={ !(isConnected && hasAllowance) }
          isLoading={ isCreatingTestament }
          onClick={ handleCreateTestamentButtonClick }
        >
           { action }
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default CreatePlan;
