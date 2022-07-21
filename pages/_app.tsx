import { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import { store } from 'store';
import { useEffect } from 'react';
import Layout from 'components/layout';

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'normal'
      }
    }
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter'
  }
});

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.on('accountsChanged', handleAccountChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    }
  }, []);

  async function handleAccountChanged() {
    window.location.reload();
  }

  function handleChainChanged() {
    window.location.reload();
  }

  return(
    <Provider store={store}>
      <ChakraProvider theme={ theme }>
        <Layout>
          <Component { ...pageProps } />
        </Layout>
      </ChakraProvider>
    </Provider>
  ); 
}

export default appWithTranslation(App);
