import { FC } from 'react';
import { MainLayout } from 'client/layouts/MainLayout';
import { fetch } from 'shared/utils/fetch';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';

const User: FC = inject('store')(({ user, store }: any) => {
    console.log(store, '333333');
    return (
        <>
            <Head>
                <title>Рейтинг игроков | СОЮЗ</title>
            </Head>
            <MainLayout>
                {user.email} {user.roles.map((i) => i.name)}
                {store.users.map((i) => (
                    <div>{i.email}</div>
                ))}
            </MainLayout>
        </>
    );
});

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
