import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function Home() {}

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
