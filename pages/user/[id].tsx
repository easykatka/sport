import { FC } from 'react';
import { MainLayout } from 'client/layouts/MainLayout';
import { fetch } from 'shared/utils/fetch';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import Head from 'next/head';

const User: FC = ({ user }: any) => {
console.log("🚀 ~ file: [id].tsx ~ line 8 ~ user", user.roles)
    return (
        <>
            <Head>
                <title>Рейтинг игроков | СОЮЗ</title>
            </Head>
            <MainLayout>{user.email} {user.roles.map(i => i.name)}</MainLayout>
        </>
    );
};

export const getServerSideProps = buildServerSideProps(async (ctx: any) => {
    try {
        const { id } = ctx.query;
        console.log("🚀 ~ file: [id].tsx ~ line 22 ~ getServerSideProps ~ id", id)
        const user = await fetch(`/api/user/getUserByEmail/${id}`);
        return { user };
    } catch (e) {
        console.log(e);
    }
});

export default User;
