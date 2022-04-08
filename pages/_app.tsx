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
import { UserApi } from 'client/api';
import { parseCookies } from 'nookies';

export default function App({ Component, pageProps }) {
    const { appData, initialState } = pageProps;
    const store = useStore(initialState);
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <AppDataContext.Provider value={appData}>
                    <Head>
                        <title>СОЮЗ любителей мини-футбола</title>
                    </Head>
                    <CssBaseline />
                    <Component {...pageProps} />
                </AppDataContext.Provider>
            </ThemeProvider>
        </Provider>
    );
}

App.getInitialProps = buildServerSideProps(async (ctx) => {
    console.log('🚀 ~ file: _app.tsx ~ line 34 ~ getInitialProps ~ ctx', ctx);
    try {
        const { token } = parseCookies(ctx);
        const userData = token && token !== 'undefined' ? await UserApi.me(token) : undefined;
        return { props: {} };
    } catch (e) {
        console.log(e);
        return { props: {} };
    }
});
