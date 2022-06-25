import styles from './image.module.scss';
import NextImage from 'next/image';

interface ImageProps {
    record: { id: number };
    property: string;
    width?: number;
    height?: number;
    noImageLabel?: string;
    model: string;
}
export const Image: React.FC<ImageProps> = ({ model, record, property, width = 100, height = 100, noImageLabel = 'Нет фото' }) => {
    if (!record[property])
        return (
            <div className={[styles.image, styles.skeleton].join(' ')} style={{ width, height }}>
                {noImageLabel}
            </div>
        );
    const url = `/storage/${model}/`;
    const fileUrl = url + `${record.id}-${property}`;
    return <NextImage loader={() => fileUrl} src={fileUrl} unoptimized={true} alt='' width={width} height={height} className={styles.image} />;
};
