import { Button, ButtonGroup, ButtonProps, Select } from '@chakra-ui/react';
import { getChains } from 'utils/chains/index';
import { useTranslation } from 'next-i18next';
import ConnectWallet from 'components/connect-wallet';
import Image from 'next/image';
import styles from 'styles/Navbar.module.scss';

import type { Chain } from 'utils/chains/index';

const Navbar = () => {
  const { t } = useTranslation();
  const buttonProps: ButtonProps = {
    backgroundColor: '#FFFFFF'
  };

  const chains: Chain[] = getChains(true, true);
  
  return (
    <div className={ styles.navbar }>
      <Image src="/logo.png" alt="Peace Logo" width={200} height={60} />

      <ButtonGroup className={styles['navbar__button__container']}>
        <Button { ...buttonProps } backgroundColor='#F6F8FB'>
          { t('navbar.inheritance') }
        </Button>
        <Button { ...buttonProps }>
          { t('navbar.claim') }
        </Button>
        <Button { ...buttonProps }>
          { t('navbar.donations') }
        </Button>
      </ButtonGroup>

      <div className={ styles['navbar__wallet__container'] }>
        <Select mr={ 2 } height='44px' width={ 130 }>
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

        <ConnectWallet />
      </div>
    </div>
  );
}

export default Navbar;
