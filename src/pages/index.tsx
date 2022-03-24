import { FC } from 'react';
import { fetch } from 'src/shared/utils/fetch';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
// import { useFeature } from 'src/client/hooks/useFeatures';
import { MainLayout } from '../client/layouts/MainLayout';

const Home: FC = () => {
    // const linkFeature = useFeature('blog_link');
    return <MainLayout> 123</MainLayout>;
};

// export const getServerSideProps = buildServerSideProps(async () => {
//     const blogPosts = await fetch('/api/blog-posts');
//     return { blogPosts };
// });

export default Home;
