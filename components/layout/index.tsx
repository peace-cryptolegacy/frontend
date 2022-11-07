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
        <div className="flex w-full justify-center px-24">
          <div>
            <Navbar />
            {children}
            <Footer />
          </div>
        </div>
      </Section>
    </>
  );
};

export default Layout;
