import { Button } from '@chakra-ui/react';
import { inherit } from 'utils/web3/heritage';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

import type { ITestament } from 'utils/web3/heritage';

type props = {
  testator: ITestament;
}

const InheritorActions = ({ testator }: props) => {
  const { t } = useTranslation('common');
  
  const [isInheriting, setIsInheriting] = useState<boolean>(false);

  async function handleInheritButtonClick() {
    try {
      setIsInheriting(true);

      await inherit();
    } catch (error) {
      alert(error);
    } finally {
      setIsInheriting(false);
    }
  }

  return (
    <Button
      colorScheme='blue' 
      isLoading={ isInheriting }
      onClick={ handleInheritButtonClick }
    >
      { t('testament.claim') }
    </Button> 
  );
}

export default InheritorActions;
