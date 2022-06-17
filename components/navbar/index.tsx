import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Button, ButtonGroup, ButtonProps, Select } from '@chakra-ui/react';
import { getChains } from 'utils/chains/index';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import ConnectWallet from 'components/connect-wallet';
import Image from 'next/image';
import styles from 'styles/Navbar.module.scss';

import type { Chain } from 'utils/chains/index';

type GetButtonProps = (token: string) => ButtonProps;

const Navbar = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const [chain, setChain] = useState<number>(1);

  const chains: Chain[] = getChains(true, true);

  useEffect(() => {
    setChain(chains[0].chainId);
  }, [chains]);

  const getButtonProps: GetButtonProps = (type) => ({
    backgroundColor: router.pathname === type ? '#F6F8FB' : '#FFFFFF',
    onClick: () => router.push(type)
  });

  function handleChainSelectChange(event: BaseSyntheticEvent) {
    const chain: number = event.target.value;

    setChain(chain);
  }

  return (
    <div className={ styles.navbar }>
      <Image src='/logo.png' alt='Peace Logo' width={200} height={60} />

      <ButtonGroup className={styles['navbar__button__container']}>
        <Button 
          { ...getButtonProps('/') }
        >
          { t('navbar.inheritance') }
        </Button>
        <Button 
          { ...getButtonProps('/claim') }
        >
          { t('navbar.claim') }
        </Button>
        <Button 
          { ...getButtonProps('/donations') }
        >
          { t('navbar.donations') }
        </Button>
      </ButtonGroup>

      <div className={ styles['navbar__wallet__container'] }>
        <Select 
          height='44px' 
          mr={ 2 } 
          onChange={ handleChainSelectChange }
          value={ chain }
          width={ 130 } 
        >
          {
            chains.map((chain) => {
              return (
                <option key={ chain.chainId } value={ chain.chainId }>
                  { chain.name }
                </option>
              );
            })
          }
        </Select>

        <ConnectWallet selectedChain={ chain } />
      </div>
    </div>
  );
}

export default Navbar;
