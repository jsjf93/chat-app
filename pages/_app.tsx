import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SignalrProvider } from '../common/context/SignalrContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SignalrProvider>
      <Component {...pageProps} />
    </SignalrProvider>
  );
}
export default MyApp;
