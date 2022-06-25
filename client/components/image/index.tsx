import styles from './image.module.scss';

interface ImageProps {
    record: { id: number };
    property: string;
    width?: number;
    height?: number;
    noImageLabel?: string;
}
export const Image: React.FC<ImageProps> = ({ record, property, width = 100, height = 100, noImageLabel = 'Нет фото' }) => {
    if (!record[property])
        return (
            <div className={[styles.image, styles.skeleton].join(' ')} style={{ width, height }}>
                {noImageLabel}
            </div>
        );
    const url = 'http://localhost:3000/storage/user/';
    const filename = url + `${record.id}-${property}`;
    return <img width={width} height={height} src={filename} className={styles.image} />;
};
