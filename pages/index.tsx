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

export default Home;
