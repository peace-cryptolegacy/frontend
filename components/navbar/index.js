import ConnectWallet from 'components/connect-wallet';
import Image from 'next/image';
import styles from 'styles/Navbar.module.scss';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Image src="/logo.png" alt="Peace Logo" width={200} height={60} />

      <ConnectWallet />
    </div>
  );
}
