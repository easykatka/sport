import { GetServerSidePropsContext } from 'shared/types/next';
import { AppData } from 'shared/types/app-data';
import { filterUnserializable } from './filterUnserializable';
import { StaticQuery } from './buildServerSideProps';

const extractAppData = (ctx: GetServerSidePropsContext<Partial<StaticQuery>>) => {
    const { features, basePath } = ctx.query.config || {};
    return filterUnserializable({ features, basePath }) as Partial<AppData>;
};

export { extractAppData };
