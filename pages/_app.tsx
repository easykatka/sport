import Head from 'next/head';
import NextApp, { AppProps } from 'next/app';
import { AppDataContext } from 'client/ssr/appData';
import { AppData } from 'shared/types/app-data';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../client/theme';
import '../client/styles/globals.scss';
import 'macro-css';
import { Provider } from 'mobx-react';
import { useStore } from 'client/store/store';

export default function App({ Component, pageProps }) {
    const { appData, initialState } = pageProps;
    const store = useStore(initialState);
    return (
        <>
            <Head>
                <title>СОЮЗ любителей мини-футбола</title>
                <link rel='icon' href='/static/img/favicon.ico' />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
            </Head>
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
