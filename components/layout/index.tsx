import { ReactNode } from 'react';
import Footer from 'components/footer';
import Navbar from 'components/navbar';
import styles from 'styles/Layout.module.scss';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      
      <main className={styles['layout__body']}>
        {children}
      </main>
      
      <Footer />
    </div>
  )
}

export default Layout;
