import { 
  Button, 
  ButtonGroup, 
  FormControl,
  FormHelperText,
  Heading,
  Input,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack
} from '@chakra-ui/react';
import { addTestator } from 'utils/web3/heritage';
import { approve } from 'utils/web3/erc20';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import styles from 'styles/CreatePlan.module.scss';

export default function CreatePlan() {
  const isConnected = useSelector(state => state.web3.isConnected);
  const [isApproving, setIsApproving] = useState(false);
  const [isCreatingTestament, setIsCreatingTestament] = useState(false);
  const [inheritor, setInheritor] = useState('');
  const [maxDays, setMaxDays] = useState(30);

  async function handleApproveButtonClick() {
    try {
      setIsApproving(true);

      await approve();
    } catch (error) {
      console.log(error);
    } finally {
      setIsApproving(false)
    }
  }

  async function handleCreateTestamentButtonClick() {
    try {
      setIsCreatingTestament(true);

      await addTestator({ inheritor, maxDays });
    } catch (error) {
      console.log(error);
    } finally {
      setIsCreatingTestament(false)
    }
  }

  return (
    <div className={styles.createplan}>
      <Heading as='h1' size='lg' mb='10'>Inheritance Plan</Heading>

      <FormControl mb='10'>
        <FormHelperText mb="5">
          Select the days without activity in the wallet to activate protocol
        </FormHelperText>

        <Slider 
          defaultValue={30} 
          disabled={ !isConnected }
          max={60} 
          mb='10'
          min={30} 
          onChange={ maxDays => setMaxDays(maxDays) }
          step={15} 
          value={maxDays} 
        >
          <SliderMark value={30} mt='2' ml='-2.5' fontSize='sm'>
            30 days
          </SliderMark>
          <SliderMark value={45} mt='2' ml='-2.5' fontSize='sm'>
            45 days
          </SliderMark>
          <SliderMark value={60} mt='2' ml='-10' fontSize='sm' style={{ whiteSpace: 'nowrap' }}>
            60 days
          </SliderMark>

          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          
          <SliderThumb />
        </Slider>

        <FormHelperText mb='5'>
          Set the beneficiary address that will activate after time passed
        </FormHelperText>
        <Input 
          disabled={ !isConnected }
          id='inheritor' 
          onChange={ event => setInheritor(event.currentTarget.value)}
          placeholder='Wallet Address' 
          type='string' 
          value={ inheritor }
        />
      </FormControl>

      <ButtonGroup className={styles['createplan--submitbuttons']} gap='10'>
        <Button 
          colorScheme='blue' 
          disabled={ !isConnected } 
          isLoading={ isApproving }
          onClick={ handleApproveButtonClick }
        >
          Approve
        </Button>
        <Button 
          colorScheme='blue'
          disabled={ !isConnected }
          isLoading={ isCreatingTestament }
          onClick={ handleCreateTestamentButtonClick }
        >
           Create testament
        </Button>
      </ButtonGroup>
    </div>
  );
}
