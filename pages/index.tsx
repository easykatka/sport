import { UserApi } from 'client/api';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { FC } from 'react';
import { MainLayout } from '../client/layouts/MainLayout';

const Home: FC = () => {
    return (
        <>
            <MainLayout>123</MainLayout>
        </>
    );
};

export const getServerSideProps = buildServerSideProps(async (ctx) => {
    try {
        const { token } = parseCookies(ctx);
        const userData = token !== 'undefined' ? await UserApi.me(token) : undefined;
        console.log('🚀 ~ file: index.tsx ~ line 20 ~ getServerSideProps ~ userData', userData);
        return { props: {} };
    } catch (e) {
        console.log(e);
        return { props: {} };
    }
});

export default Home;
