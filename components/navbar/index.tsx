import { Box, Button, ButtonProps, HStack } from '@chakra-ui/react';
import ConnectWallet from 'components/connect-wallet';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from 'styles/Navbar.module.scss';

type GetButtonProps = () => ButtonProps;

const Navbar = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const getButtonProps: GetButtonProps = (type) => ({
    color: router.pathname === type ? '#5F4DFF' : '#1D2B4F',
    className:
      router.pathname === type ? styles['navbar__button--selected'] : '',
    fontSize: 14,
    fontWeight: 500,
    onClick: () => router.push(type),
    variant: 'ghost',
  });

  return (
    <div className={styles.navbar}>
      <Image src="/logo.png" alt="Peace Logo" width="144px" height="48px" />

      <HStack className={styles['navbar__button__container']}>
        <Button {...getButtonProps('/')}>{t('navbar.inheritance')}</Button>
        <Button {...getButtonProps('/claim')}>{t('navbar.claim')}</Button>
        <Button {...getButtonProps('/vaults')}>{t('navbar.vaults')}</Button>
        <Button {...getButtonProps('/services')}>{t('navbar.services')}</Button>
        <Button {...getButtonProps('/nft')}>{t('navbar.nft')}</Button>
      </HStack>

      <div className={styles['navbar__wallet__container']}>
        <Button
          backgroundColor="#FFFFFF"
          borderRadius={11}
          boxShadow="0px 5px 15px 5px rgba(0,0,0,0.05)"
          height="48px"
          mr="20px"
          width="57px"
        >
          <Box marginTop={1} position="absolute">
            <Image
              src="/logos/moonbeam.png"
              alt="Moonbeam Logo"
              height="35px"
              width="35px"
            />
          </Box>
        </Button>

        <ConnectWallet />
      </div>
    </div>
  );
};

export default Navbar;
