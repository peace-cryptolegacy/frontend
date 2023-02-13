/* eslint-disable tailwindcss/no-custom-classname */
import Footer from 'components/footer';
import Menu from 'components/menu/menu';
import Navbar from 'components/navbar/Navbar';
import PeaceLogo from 'components/PeaceLogo/PeaceLogo';
import Section from 'components/Section/Section';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useConnect } from 'wagmi';

type Props = {
  children?: ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();

  const { connect, connectors } = useConnect();

  const connector = connectors[0];

  useEffect(() => {
    connect({ connector });
  }, [connect, connector, connectors]);

  const renderLayout = () => {
    if (router.route === '/beneficiary-login') {
      return <>{children}</>;
    }
    return (
      <Section className="justify-center overflow-x-hidden">
        <>
          <Menu />
          <div className="relative flex min-h-screen w-full max-w-[1600px] flex-col px-5 pb-20 lg:pb-0 lg:pr-[64px] lg:pl-[calc(250px+64px)] lg-max:overflow-y-auto">
            <>
              <PeaceLogo className="top-0 left-0 z-20 hidden flex-row pt-10 lg-max:flex" />
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
