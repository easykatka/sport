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

export default function App({ Component, pageProps }) {
    const { appData, initialState } = pageProps;
    const store = useStore(initialState);
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <AppDataContext.Provider value={appData}>
                    <Head>
                        <title>СОЮЗ любителей мини-футбола</title>
                        <link rel='icon' href='/static/img/favicon.ico' />
                        <link rel='preconnect' href='https://fonts.googleapis.com' />
                        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
                        <link
                            href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap'
                            rel='stylesheet'></link>
                    </Head>
                    <CssBaseline />
                    <Component {...pageProps} />
                </AppDataContext.Provider>
            </ThemeProvider>
        </Provider>
    );
}
