import { FC } from 'react';
import { MainLayout } from '../client/layouts/MainLayout';
import { fetch } from 'src/shared/utils/fetch';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';

type Player = {
    id: number;
    login: string;
    password: string;
};

const Rules: FC = ({ players }: any) => {
    return (
        <MainLayout>
            {players.map((player: Player) => (
                <div>
                    <div>{player.id}</div>
                    <div>{player.login}</div>
                    <div>{player.password}</div>
                </div>
            ))}
        </MainLayout>
    );
};

export const getServerSideProps = buildServerSideProps(async () => {
    try {
        const players = await fetch('/api/user/getAllUsers');
        return { players };
    } catch (e) {
        console.log(e);
    }
});

export default Rules;
