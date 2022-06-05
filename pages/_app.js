import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { useStore } from 'store';
import Layout from 'components/layout';
  
function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return(
    <Provider store={store}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  ); 
}

export default App;
