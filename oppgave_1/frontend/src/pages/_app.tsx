
import '../styles/css/main.css';  
import RootLayout from "../layout/RootLayout";

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
  <Component {...pageProps} />
  </RootLayout>
  );
}

export default MyApp;
