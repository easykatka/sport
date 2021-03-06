import React from 'react';
import ArrowRight from '@mui/icons-material/ArrowRight';
import styles from './SideComments.module.scss';
import { CommentItem } from './CommentItem';
import clsx from 'clsx';
import { useComments } from '../../hooks/useComments';

export const SideComments = () => {
	const [visible, setVisible] = React.useState(true);
	const { comments } = useComments();

	const toggleVisible = () => {
		setVisible(!visible);
	};

	return (
		<div className={clsx(styles.root, !visible && styles.rotated)}>
			<h3 onClick={toggleVisible}>
				Комментарии <ArrowRight />
			</h3>
			{visible && comments.map((obj) => <CommentItem key={obj} {...obj} />)}
		</div>
	);
};
