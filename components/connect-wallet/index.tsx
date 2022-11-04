import { AddIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { connect } from 'utils/web3/connect';
import { formatAddress } from 'utils/formatters';
import { getAddress } from 'store/reducers/web3';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { useTranslation } from 'next-i18next';
import styles from 'styles/ConnectWallet.module.scss';

const ConnectWallet = () => {
  const { t } = useTranslation('common');

  const address: string = useAppSelector(getAddress);
  const isConnecting: boolean = useAppSelector(
    (state) => state.web3.isConnecting
  );

  const dispatch = useAppDispatch();

  function handleClick() {
    connect(dispatch);
  }

  function renderWalletInfo() {
    return (
      <div className={styles['connectwallet__user']}>
        {formatAddress(address)}
      </div>
    );
  }

  function renderConnectWallet() {
    return (
      <Button
        backgroundColor="#5F4DFF"
        borderRadius={11}
        color="#FFFFFF"
        fontSize={14}
        fontWeight={500}
        height="44px"
        isLoading={isConnecting}
        leftIcon={<AddIcon />}
        onClick={handleClick}
        width={200}
      >
        {t('connect-wallet.connect')}
      </Button>
    );
  }

  return (
    <div className={styles.connectwallet}>
      {address ? renderWalletInfo() : renderConnectWallet()}
    </div>
  );
};

export default ConnectWallet;
