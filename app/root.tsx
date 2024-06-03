import styles from '~/styles/style.css?url';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { queryClient } from './lib/clientQueryClient';
import { NavBar } from './components/nav-bar';
import { AudioPlayer } from './components/audio-player';
import { store } from './store.client/store';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <AudioPlayer />
    </>
  );
}
