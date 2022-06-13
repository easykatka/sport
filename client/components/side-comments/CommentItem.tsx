import React from 'react';
import styles from './SideComments.module.scss';
import Link from 'next/link';
import { Avatar } from '@mui/material';
import { User as UserEntity } from 'server/modules/user/user.entity';


interface CommentItemProps {
	user: UserEntity;
	text: string;
	post: any;
}

export const CommentItem: React.FC<CommentItemProps> = ({ user, text, post }) => {
	return (
		<div className={styles.commentItem}>
			<div className={styles.userInfo}>
				<Avatar style={{ marginRight: 10 }}>{user.lastname[0]}</Avatar>
				<Link href={`/profile/${user.id}`}>
					<a>
						<b>{user.lastname}</b>
					</a>
				</Link>
			</div>
			<p className={styles.text}>{text}</p>
			<Link href={`/news/${post.id}`}>
				<a>
					<span className={styles.postTitle}>{post.title}</span>
				</a>
			</Link>
		</div>
	);
};
