import { ParsedUrlQuery } from 'querystring';
import { AppData } from 'shared/types/app-data';
import { Config } from 'shared/types/config';
import { GetServerSideProps, GetServerSidePropsContext } from 'shared/types/next';
import { extractAppData } from './extractAppData';

type StaticProps = {
    appData: Partial<AppData>;
};

export type StaticQuery = {
    config: Config;
};

const buildServerSideProps = <P, Q extends ParsedUrlQuery = ParsedUrlQuery>(
    getServerSideProps: (ctx: GetServerSidePropsContext<Q>) => Promise<P>
): GetServerSideProps<StaticProps & P, Partial<StaticQuery> & Q> => {
    return async (ctx) => {
        const props = await getServerSideProps(ctx);

        return {
            props: {
                ...props,
                appData: extractAppData(ctx),
            },
        };
    };
};

export { buildServerSideProps };
