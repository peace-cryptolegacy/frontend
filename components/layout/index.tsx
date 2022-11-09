import Footer from 'components/footer';
import Menu from 'components/menu/menu';
import Navbar from 'components/navbar/Navbar';
import Section from 'components/Section/Section';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Section className="overflow-x-hidden">
        <Menu />
        <div className="mx-auto flex w-full max-w-[1440px] flex-col px-24">
          <Navbar />
          {children}
          <Footer />
        </div>
      </Section>
    </>
  );
};

export default Layout;
