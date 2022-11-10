// import ConnectBanner from 'components/connect-banner';
import TestamentCreation from 'components/TestamentCreation';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import Head from 'next/head';

function Home() {
  return <TestamentCreation />;
}

export const getStaticProps: GetStaticProps = async ({
  defaultLocale = 'en',
  locale,
}) => {
  const translations = await serverSideTranslations(locale || defaultLocale, [
    'common',
  ]);

  return {
    props: {
      ...translations,
    },
  };
};

export default Home;
