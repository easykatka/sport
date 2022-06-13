import Head from 'next/head';
import { AppDataContext } from 'client/ssr/appData';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../client/theme';
import 'client/styles/globals.scss';
import 'macro-css';
import { Provider } from 'mobx-react';
import { useStore } from 'client/hooks';
import { API } from 'client/api';
import { parseCookies } from 'nookies';
import { extractAppData } from 'client/ssr/extractAppData';
import { Header } from 'client/components/Header';
import axios from 'axios';

export default function App({ Component, pageProps }) {
	const { initialState, appData } = pageProps;
	const store = useStore(initialState);
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<AppDataContext.Provider value={appData}>
					<Head>
						<title>СОЮЗ любителей мини-футбола</title>
					</Head>
					<Header />
					<CssBaseline />
					<Component {...pageProps} />
				</AppDataContext.Provider>
			</ThemeProvider>
		</Provider>
	);
}

App.getInitialProps = async ({ ctx }) => {
    console.log("🚀 ~ file: _app.tsx ~ line 35 ~ App.getInitialProps= ~ ctx", ctx.req)
	try {
		const { Auth: AuthApi } = API;
		const { token } = parseCookies(ctx);
		const user = token && token !== 'undefined' ? await AuthApi.me(token) : undefined;
		return { pageProps: { initialState: { user }, appData: extractAppData(ctx) } };
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.log('App initial props error: ', e.response.statusText);
		}
		return { pageProps: { initialState: {}, appData: {} } };
	}
};
