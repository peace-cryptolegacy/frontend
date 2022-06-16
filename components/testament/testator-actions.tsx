import { Button } from '@chakra-ui/react';
import { setTestator } from 'store/reducers/web3';
import { updateProof } from 'utils/web3/heritage';
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
    <Button
      colorScheme='blue' 
      isLoading={ isUpdatingProof }
      onClick={ handleUpdateProofButtonClick }
    >
      { t('testament.update-proof') }
    </Button>
  );
}

export default TestatorActions;
