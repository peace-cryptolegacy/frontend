import { Button, Stack } from '@chakra-ui/react';
import { setTestator } from 'store/reducers/web3';
import { revoke, updateProof } from 'utils/web3/heritage';
import { useAppDispatch } from 'store/hooks';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import type { ITestament } from 'utils/web3/heritage';

type props = {
  testator: ITestament;
}

const TestatorActions = ({ testator }: props) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();

  const [isUpdatingProof, setUpdatingProof] = useState<boolean>(false);
  const [isRevokingTestament, setRevokingTestament] = useState<boolean>(false);

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
      alert(error);
    } finally {
      setUpdatingProof(false)
    }
  }

  async function handleRevokeButtonClick() {
    try {
      setRevokingTestament(true);

      const result = await revoke();

      if (result !== undefined) {
        dispatch(setTestator(undefined));
      }
    } catch (error) {
      alert(error);
    } finally {
      setRevokingTestament(false)
    }
  }

  return (
    <Stack direction='row' spacing='4'>
      <Button
        colorScheme='blue' 
        isLoading={ isRevokingTestament }
        onClick={ handleRevokeButtonClick }
      >
        { t('testament.revoke') }
      </Button>
      
      <Button
        colorScheme='blue' 
        isLoading={ isUpdatingProof }
        onClick={ handleUpdateProofButtonClick }
      >
        { t('testament.update-proof') }
      </Button>
    </Stack>
  );
}

export default TestatorActions;
