import Document, { Html, Head, Main, NextScript } from 'next/document';
import { fetch } from 'src/shared/utils/fetch';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang='ru'>
                <Head />
                <link
                    href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap'
                    rel='stylesheet'></link>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
