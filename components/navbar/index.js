import { Button } from '@chakra-ui/react';
import Image from 'next/image';
import styles from 'styles/Navbar.module.scss';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Image src="/logo.png" alt="Peace Logo" width={200} height={60} />

      <Button colorScheme='blue'>
        Connect wallet
      </Button>
    </div>
  );
}
