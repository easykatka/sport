import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { BlogPost } from 'src/shared/types/blog-post';
import { fetch } from 'src/shared/utils/fetch';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';

type TBlogProps = {
	post: BlogPost;
};

type TBlogQuery = {
	id: string;
};

const Blog: FC<TBlogProps> = ({ post = {} }) => {
	return (
		<div>
			<Link href={'/'}>Home</Link>
			<h1>Blog {post.title}</h1>
		</div>
	);
};

export const getServerSideProps = buildServerSideProps<TBlogProps, TBlogQuery>(
	async (ctx) => {
		console.log(ctx.query)
		const id = ctx.query.id;
		const post = await fetch(`/api/blog-posts/${id}`);

		return { post };
	},
);

export default Blog;	