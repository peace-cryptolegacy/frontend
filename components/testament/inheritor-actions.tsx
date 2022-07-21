import { Button } from '@chakra-ui/react';
import { inherit, Status } from 'utils/web3/heritage';
import { setInheritor } from 'store/reducers/web3';
import { useAppDispatch } from 'store/hooks';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import type { ITestament } from 'utils/web3/heritage';

type props = {
  inheritor: ITestament;
}

const InheritorActions = ({ inheritor }: props) => {
  const { t } = useTranslation('common');
  const dispatch = useAppDispatch();
  
  const [isInheriting, setIsInheriting] = useState<boolean>(false);

  async function handleInheritButtonClick() {
    try {
      setIsInheriting(true);

      const result = await inherit();

      if (result !== undefined) {
        dispatch(setInheritor({ 
          ...inheritor, 
          status: result.status
        }));
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsInheriting(false);
    }
  }

  return (
    <Button
      colorScheme='blue' 
      disabled={ inheritor.status === Status.INHERITED }
      isLoading={ isInheriting }
      onClick={ handleInheritButtonClick }
    >
      { t('testament.claim') }
    </Button> 
  );
}

export default InheritorActions;
