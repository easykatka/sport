import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import styles from './image-input.module.scss';

export const ImageInput = ({ title = 'Загрузить изображение', onChange, width = 250, height = 250 }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const handleCapture = (e) => {
        setSelectedImage(e.target.files[0]);
        onChange?.();
    };

    return (
        <div className={styles.imageInput}>
            <input accept='image/*' type='file' id='select-image' onChange={handleCapture} />
            <label htmlFor='select-image'>
                <div style={{ width, height }} className={selectedImage ? styles.preview : styles.noImage}>
                    {imageUrl && selectedImage ? <NextImage src={imageUrl} alt={selectedImage.name} height={height} width={width} objectFit='contain' /> : title}
                </div>
            </label>
        </div>
    );
};
