/* eslint-disable tailwindcss/no-custom-classname */
import Footer from 'components/footer';
import Menu from 'components/menu/menu';
import Navbar from 'components/navbar/Navbar';
import Section from 'components/Section/Section';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { beneficiarylogin } = router.query;

  const renderLayout = () => {
    if (beneficiarylogin) {
      return <>{children}</>;
    }
    return (
      <Section className="overflow-x-hidden">
        <>
          <Menu />
          <div className="layout__container flex h-full w-full max-w-fit flex-col pl-96 pr-24">
            <>
              <Navbar />
              {children}
              <Footer />
            </>
          </div>
        </>
      </Section>
    );
  };

  return renderLayout();
};

export default Layout;
