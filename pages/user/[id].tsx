import { FC } from 'react';
import { MainLayout } from 'client/layouts/MainLayout';
import { fetch } from 'shared/utils/fetch';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import Head from 'next/head';

const User: FC = ({ user }: any) => {
    return (
        <>
            <Head>
                <title>Рейтинг игроков | СОЮЗ</title>
            </Head>
            <MainLayout>
                {user.email} {user.roles.map((i) => i.name)}
            </MainLayout>
        </>
    );
};

export const getServerSideProps = buildServerSideProps(async (ctx: any) => {
    try {
        const { id } = ctx.query;
        const user = await fetch(`/api/user/getUserByEmail/${id}`);
        return { user };
    } catch (e) {
        console.log(e);
    }
});

export default User;
