import { Button, ButtonGroup, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import ConnectWallet from 'components/connect-wallet';
import Image from 'next/image';
import styles from 'styles/Navbar.module.scss';

const Navbar: FC = () => {
  const { t } = useTranslation();
  const buttonProps: ButtonProps = {
    backgroundColor: '#FFFFFF',
    textTransform: 'capitalize'
  };
  
  return (
    <div className={styles.navbar}>
      <Image src="/logo.png" alt="Peace Logo" width={200} height={60} />

      <ButtonGroup className={styles['navbar__button__container']}>
        <Button { ...buttonProps } backgroundColor='#F6F8FB'>
          { t('inheritance') }
        </Button>
        <Button { ...buttonProps }>
          { t('claim') }
        </Button>
        <Button { ...buttonProps }>
          { t('donation') }
        </Button>
      </ButtonGroup>

      <ConnectWallet />
    </div>
  );
}

export default Navbar;
