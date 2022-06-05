import Navbar from 'components/navbar';
import Footer from 'components/footer';
import styles from 'styles/Layout.module.scss';

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
