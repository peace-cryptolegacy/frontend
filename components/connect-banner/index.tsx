import { Button } from '@chakra-ui/react';
import { connect } from 'utils/web3/connect';
import { getAddress } from 'store/reducers/web3';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import styles from 'styles/ConnectBanner.module.scss';

const ConnectBanner = () => {
  const address: string = useAppSelector(getAddress);
  const isConnecting: boolean = useAppSelector(
    (state) => state.web3.isConnecting
  );

  const dispatch = useAppDispatch();

  function handleClick() {
    connect(dispatch);
  }

  if (address) return null;

  return (
    <div className={styles.connectbanner}>
      <div className={styles['connectbanner__title']}>
        <span>Welcome to your</span>
        <span className={styles['connectbanner__title--blue']}>
          {' '}
          cryptolegacy
        </span>
        <span>!</span>
      </div>

      <div className={styles['connectbanner__subtitle']}>
        Peace is your easy way to do DeFi without leaving problems.
      </div>

      <Button
        background="#5F4DFF"
        border-radius="5px"
        color="#FFFFFF"
        fontSize="14"
        fontWeight={500}
        height="48px"
        isLoading={isConnecting}
        marginTop="20px"
        onClick={handleClick}
        width="420px"
      >
        Login via web3 wallet
      </Button>
    </div>
  );
};

export default ConnectBanner;
