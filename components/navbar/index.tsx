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
  const { t } = useTranslation();
  const router = useRouter();

  const getButtonProps: GetButtonProps = (type) => ({
    backgroundColor: router.pathname === type ? '#F6F8FB' : '#FFFFFF',
    onClick: () => router.push(type)
  });

  const chains: Chain[] = getChains(true, true);
  
  return (
    <div className={ styles.navbar }>
      <Image src="/logo.png" alt="Peace Logo" width={200} height={60} />

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
