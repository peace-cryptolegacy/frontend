/* eslint-disable tailwindcss/no-custom-classname */
import Footer from 'components/footer';
import Menu from 'components/menu/menu';
import Navbar from 'components/navbar/Navbar';
import Section from 'components/Section/Section';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Section className="overflow-x-hidden">
        <>
          <Menu />
          <div className="layout__container flex h-full w-full flex-col px-96">
            <>
              <Navbar />
              {children}
              <Footer />
            </>
          </div>
        </>
      </Section>
    </>
  );
};

export default Layout;
