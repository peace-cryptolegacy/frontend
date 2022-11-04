import '../styles/globals.scss';
import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { providers } from 'ethers';
import { setChainId } from 'store/reducers/web3';
import { store } from 'store';
import { useEffect } from 'react';
import Layout from 'components/layout';
// why import with require? https://github.com/FortAwesome/Font-Awesome/issues/19348
// import { library } from "@fortawesome/fontawesome-svg-core";
const { library } = require('@fortawesome/fontawesome-svg-core');
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faMagnifyingGlass,
  faSliders,
} from '@fortawesome/free-solid-svg-icons';

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal',
      },
    },
  },
  fonts: {
    heading: 'Readex Pro',
    body: 'Readex Pro',
  },
});

library.add(fab, faEnvelope, faMagnifyingGlass, faSliders);

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!window.ethereum) return;

    const provider: providers.Web3Provider = new providers.Web3Provider(
      window.ethereum
    );

    provider.on('network', ({ chainId }) => {
      store.dispatch(setChainId({ chainId }));
    });

    window.ethereum.on('accountsChanged', handleAccountChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  async function handleAccountChanged() {
    window.location.reload();
  }

  function handleChainChanged() {
    window.location.reload();
  }

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default appWithTranslation(App);
