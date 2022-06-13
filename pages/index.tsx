import { GetStaticProps } from "next";
import { getTestator } from 'store/reducers/web3';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppSelector } from 'store/hooks';
import CreatePlan from 'components/create-plan';
import Head from 'next/head';
import Testament from 'components/testament';

function Home() {
  const testator = useAppSelector(getTestator);

  return (
    <div>
      <Head>
        <title>Peace</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {
          testator === undefined ?
            <CreatePlan /> :
            <Testament testator={ testator } />
        }
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ defaultLocale, locale }) => {
  const translations = await serverSideTranslations('es', ['common']);

  return {
    props: {
      ...translations
    }
  };
}

export default Home;
