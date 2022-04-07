import Head from 'next/head';
import NextApp, { AppProps } from 'next/app';
import { AppDataContext } from 'client/ssr/appData';
import { AppData } from 'shared/types/app-data';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../client/theme';
import '../client/styles/globals.scss';
import 'macro-css';
import { Provider } from 'mobx-react';
import { useStore } from 'client/hooks';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';

export default function App({ Component, pageProps }) {
    const { appData, initialState } = pageProps;
    const store = useStore(initialState);
    console.log("🚀 ~ file: _app.tsx ~ line 16 ~ App ~ store", store)
    const users = store.users;
    console.log('🚀 ~ file: _app.tsx ~ line 19 ~ App ~ users', users);
    return (
        <>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AppDataContext.Provider value={appData}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </AppDataContext.Provider>
                </ThemeProvider>
            </Provider>
        </>
    );
}

// export function getServerSideProps() {
//     return { props: { initialState: { lastUpdate: Date.now() } } }
//   }
