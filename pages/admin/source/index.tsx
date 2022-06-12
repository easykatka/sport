import { FC } from 'react';
import { fetch } from 'shared/utils/fetch';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';
import { Source as SourceEntity } from 'server/modules/source/source.entity';
import { ModelList } from 'client/components/model-list';

interface SourceProps {
    sources: SourceEntity[];
}

const Source: FC<SourceProps> = ({ sources }) => {
    const columns = [
        { label: 'id', field: 'id' },
        { label: 'Название', field: 'name' },
    ];
    return (
        <>
            <Head>
                <title>Администрирование СОЮЗ | Пользователи</title>
            </Head>
            <AdminLayout>
                <ModelList records={sources} columns={columns} />
            </AdminLayout>
        </>
    );
};

const PATH = '/api/source';

export const getServerSideProps = buildServerSideProps(async () => {
    try {
        const sources = await fetch(`${PATH}/getAll`);
        return { sources };
    } catch (e) {
        console.log(e);
    }
});

export default Source;
