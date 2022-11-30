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

  const renderLayout = () => {
    if (router.route === '/beneficiary-login') {
      return <>{children}</>;
    }
    return (
      <Section className="justify-center overflow-x-hidden">
        <>
          <Menu />
          <div className="flex h-screen w-full max-w-[1600px] flex-col overflow-x-auto px-20 pb-36 lg:pb-0 lg:pr-[64px] lg:pl-[calc(250px+64px)]">
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
