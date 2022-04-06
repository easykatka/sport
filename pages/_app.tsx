import Head from 'next/head';
import NextApp, { AppProps } from 'next/app';
import { AppDataContext } from 'client/ssr/appData';
import { AppData } from 'shared/types/app-data';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../client/theme';
import '../client/styles/globals.scss';
import 'macro-css';

class App extends NextApp<AppProps> {
    appData: AppData;

    constructor(props: AppProps) {
        super(props);

        this.appData = props.pageProps.appData || {};
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Head>
                    <title>СОЮЗ любителей мини-футбола</title>
                    <link rel='icon' href='/static/img/favicon.ico' />
                    <link rel='preconnect' href='https://fonts.googleapis.com' />
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
                </Head>

                <ThemeProvider theme={theme}>
                    <AppDataContext.Provider value={this.appData}>
                        <CssBaseline />
                        <Component {...pageProps} />
                    </AppDataContext.Provider>
                </ThemeProvider>
            </>
        );
    }
}

export default App;
