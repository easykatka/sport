import { FC } from 'react';
import { MainLayout } from '../client/layouts/MainLayout';
import Head from 'next/head';

const Games: FC = () => {
    return (
        <>
            <Head>
                <title>Игры | СОЮЗ</title>
            </Head>
            <MainLayout>
                <div>123</div>
            </MainLayout>
        </>
    );
};

export default Games;
