import { FC, ReactNode } from 'react';
import Footer from 'components/footer';
import Navbar from 'components/navbar';
import styles from 'styles/Layout.module.scss';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout;
