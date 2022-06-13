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
import { addTestator } from 'utils/web3/heritage';
import { approve } from 'utils/web3/erc20';
import { BaseSyntheticEvent, FC, useState } from 'react';
import { getIsConnected } from 'store/reducers/web3';
import { getTokensByChainId } from 'utils/tokens/index';
import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'next-i18next';
import isEmpty from "lodash/isEmpty";
import styles from 'styles/CreatePlan.module.scss';

import type { Token } from 'utils/tokens/index';

const CreatePlan: FC = () => {
  const { t } = useTranslation();

  const isConnected: boolean = useAppSelector(getIsConnected);
  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isCreatingTestament, setIsCreatingTestament] = useState<boolean>(false);
  const [inheritor, setInheritor] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [maxDays, setMaxDays] = useState<number>(30);

  const chainId: number = useAppSelector(state => state.web3.chainId);
  const tokens: Token[] = getTokensByChainId(chainId);

  async function handleApproveButtonClick() {
    try {
      setIsApproving(true);

      await approve(token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsApproving(false)
    }
  }

  async function handleCreateTestamentButtonClick() {
    try {
      setIsCreatingTestament(true);

      await addTestator(inheritor, maxDays, token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreatingTestament(false)
    }
  }

  function handleSliderChange(maxDays: number) {
    setMaxDays(maxDays);
  }

  return (
    <div className={styles.createplan}>
      <Heading as='h1' size='lg' mb='10'>
        { t('create-plan.title') }
      </Heading>

      <FormControl mb='10'>
        <FormHelperText mb="5">
        { t('create-plan.max-days-hint') }
        </FormHelperText>

        <Slider 
          defaultValue={30} 
          isDisabled={ !isConnected }
          max={60} 
          mb='10'
          min={30} 
          onChange={ handleSliderChange }
          step={15} 
          value={maxDays} 
        >
          <SliderMark value={30} mt='2' ml='-2.5' fontSize='sm'>
            { t('create-plan.days', { days: 30 }) }
          </SliderMark>
          <SliderMark value={45} mt='2' ml='-2.5' fontSize='sm'>
            { t('create-plan.days', { days: 45 }) }
          </SliderMark>
          <SliderMark value={60} mt='2' ml='-10' fontSize='sm' style={{ whiteSpace: 'nowrap' }}>
          { t('create-plan.days', { days: 60 }) }
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
          id='token' 
          mb='5'
          onChange={ (event: BaseSyntheticEvent) => setToken(event.currentTarget.value)}
          placeholder={ t('create-plan.wallet-address') }
          type='string' 
          value={ token }
        />

        <FormHelperText mb='5'>
          { t('create-plan.token-hint') }
        </FormHelperText>

        <Select 
          onChange={ (event: BaseSyntheticEvent) => setInheritor(event.currentTarget.value)}
          placeholder={t('create-plan.token-address')}
          value={ inheritor }
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

      <ButtonGroup className={styles['createplan--submitbuttons']} gap='10'>
        <Button 
          colorScheme='blue' 
          disabled={ !isConnected || inheritor === '' } 
          isLoading={ isApproving }
          onClick={ handleApproveButtonClick }
        >
          { t('create-plan.approve-allowance') }
        </Button>
        <Button 
          colorScheme='blue'
          disabled={ !isConnected }
          isLoading={ isCreatingTestament }
          onClick={ handleCreateTestamentButtonClick }
        >
           { t('create-plan.create-testament') }
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default CreatePlan;
