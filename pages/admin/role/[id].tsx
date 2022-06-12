import React, { FC } from 'react';
import Head from 'next/head';
import { AdminLayout } from 'client/layouts/AdminLayout';
import { buildServerSideProps } from 'client/ssr/buildServerSideProps';
import { fetch } from 'shared/utils/fetch';
import axios from 'axios';
import { useForm, FormProvider } from 'react-hook-form';
import { Alert, Button, IconButton } from '@mui/material';
import { GridData } from 'client/components/GridData';
import DeleteIcon from '@mui/icons-material/Delete';
import { RoleApi } from 'client/api';
import router from 'next/router';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Role as RoleEntity } from 'server/modules/role/role.entity';
interface RoleProps {
    role: RoleEntity;
}

const Role: FC<RoleProps> = ({ role }) => {
    const isNew = !role?.id;
    const [responseError, setResponseError] = React.useState<string | null>(null);

    const Schema = yup.object().shape({
        name: yup.string().required('Введите название'),
        description: yup.string().required('Введите описание'),
    });

    const form = useForm<RoleEntity>({
        mode: 'onSubmit',
        defaultValues: role,
        resolver: yupResolver(Schema),
    });

    const fields = [
        { name: 'name', label: 'Название' },
        { name: 'description', label: 'Описание' },
        { name: 'color', label: 'Цвет' },
    ];

    const onSubmit = async (data) => {
        Object.keys(data).forEach((key) => data[key] === '' && delete data[key]);
        setResponseError(null);
        try {
            isNew ? await RoleApi.create(data) : await RoleApi.update(data);
            router.push('/admin/role');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponseError(error.response.statusText);
            }
        }
    };

    const onDelete = async () => {
        console.log('heres');
        setResponseError(null);
        try {
            await RoleApi.delete(role.id);
            router.push('/admin/role');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setResponseError(error.response.statusText);
            }
        }
    };

    return (
        <>
            <Head>
                <title>Администрирование СОЮЗ | Пользователь</title>
            </Head>
            <AdminLayout>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <GridData fields={fields} />
                        <div className='mt-20'>
                            <Button color='primary' variant='contained' size='large' type='submit'>
                                {isNew ? 'Создать' : 'Сохранить'}
                            </Button>
                            {!isNew && (
                                <IconButton color='secondary' size='large' onClick={onDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </div>
                        {responseError && (
                            <Alert className='mt-20' severity='error'>
                                {responseError}
                            </Alert>
                        )}
                    </form>
                </FormProvider>
            </AdminLayout>
        </>
    );
};

export const getServerSideProps = buildServerSideProps(async (ctx) => {
    try {
        const { id } = ctx.query;
        const role = await fetch(`/api/role/getById/${id}`);
        return { role };
    } catch (e) {
        console.log(e);
    }
});

export default Role;
