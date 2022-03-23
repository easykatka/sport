import Head from 'next/head';
import NextApp, { AppProps } from 'next/app';
import { AppDataContext } from 'src/client/ssr/appData';
import { AppData } from 'src/shared/types/app-data';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../client/theme';
import '../client/styles/globals.scss';
import 'macro-css';
import { MainLayout } from 'src/client/layouts/MainLayout';

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
                    <link rel='icon' href='/static/favicon.ico' />
                    <link rel='preconnect' href='https://fonts.googleapis.com' />
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap'
                        rel='stylesheet'></link>
                </Head>

                <ThemeProvider theme={theme}>
                    <AppDataContext.Provider value={this.appData}>
                        <CssBaseline />
                        <MainLayout>
                            <Component {...pageProps} />
                        </MainLayout>
                    </AppDataContext.Provider>
                </ThemeProvider>
            </>
        );
    }
}

export default App;
