import { FC } from 'react';
import { fetch } from 'shared/utils/fetch';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';
import { ModelList } from 'client/components/model-list';
import { User } from 'server/modules/user/user.entity';
import { Image } from 'client/components/image';

interface IProps {
    users: User[];
}

const Users: FC<IProps> = ({ users = [] }) => {
    const renderImage = (record) => <Image record={record} property='photo' />;
    const columns = [
        { label: 'id', field: 'id' },
        { label: 'Фото', field: 'photo', computed: renderImage },
        { label: 'Фамилия', field: 'lastname' },
        { label: 'Имя', field: 'firstname' },
        { label: 'Отчество', field: 'middlename' },
        { label: 'Email', field: 'email' },
        { label: 'Телеграм', field: 'telegram' },
    ];
    return (
        <>
            <Head>
                <title>Администрирование СОЮЗ | Пользователи</title>
            </Head>
            <AdminLayout>
                <ModelList records={users} columns={columns} />
            </AdminLayout>
        </>
    );
};

export const getServerSideProps = buildServerSideProps(async (ctx) => {
    try {
        const users = await fetch('/api/user/getAll');
        return { users };
    } catch (e) {
        console.log(e);
    }
});

export default Users;
