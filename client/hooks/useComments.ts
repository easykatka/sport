import React, { useEffect, useState } from 'react';

type UseCommentsProps = {
    setComments: React.Dispatch<React.SetStateAction<[]>>;
    comments: [];
};

export const useComments = (postId?: number): UseCommentsProps => {
    const [comments, setComments] = useState<[]>([]);
    useEffect(() => {
        (async () => {
            try {
                setComments([]);
            } catch (err) {
                console.warn('Fetch comments', err);
            }
        })();
    }, []);

    return { comments, setComments };
};
