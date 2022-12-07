import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faMagnifyingGlass,
  faSliders,
  faTrash,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Layout from 'components/layout';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'store';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import '../styles/globals.scss';
// why import with require? https://github.com/FortAwesome/Font-Awesome/issues/19348
// import { library } from "@fortawesome/fontawesome-svg-core";
const { library } = require('@fortawesome/fontawesome-svg-core');

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

const { provider, webSocketProvider } = configureChains(
  [chain.polygonMumbai],
  [
    publicProvider(),
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? '' }),
  ]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

library.add(fab, faEnvelope, faMagnifyingGlass, faSliders, faXmark, faTrash);

function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </Provider>
    </WagmiConfig>
  );
}

export default appWithTranslation(App);
