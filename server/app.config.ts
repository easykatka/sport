import type { Config } from 'shared/types/config';

const APP_CONFIG: Config = {
    features: {
        blog_link: true,
    },
    basePath: process.env.BASE_PATH || '',
};

export { APP_CONFIG };
