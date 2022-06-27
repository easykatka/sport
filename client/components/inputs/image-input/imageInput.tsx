import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import styles from './image-input.module.scss';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, InputLabel } from '@mui/material';
import styled from '@emotion/styled';

const Input = styled('input')({
    display: 'none',
});

export const ImageInput = ({ title = 'Загрузить изображение', label, width = 250, height = 250, name }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const { formState, control } = useFormContext();

    useEffect(() => {
        if (selectedImage) {
            setImageUrl(URL.createObjectURL(selectedImage));
        }
    }, [selectedImage]);

    const handleCapture = (e, field) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        field.onChange(file);
    };

    const getError = (name: string) => formState.errors[name]?.message;
    const renderLabel = (error: string, defaultLabel: string) => (error ? <span style={{ color: 'red' }}>{error}</span> : defaultLabel);
    const _label = renderLabel(getError(name), label);
    const labelId = `${name}-label`;

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={''}
            render={({ field }) => {
                return (
                    <FormControl fullWidth>
                        <label htmlFor='select-image' id={labelId} className={styles.imageInput}>
                            {_label}
                            <Input accept='image/*' id='select-image' type='file' onChange={(e) => handleCapture(e, field)} />
                            <div style={{ width, height }} className={selectedImage ? styles.preview : styles.noImage}>
                                {imageUrl && selectedImage ? (
                                    <NextImage src={imageUrl} alt={selectedImage.name} height={height} width={width} objectFit='contain' />
                                ) : (
                                    title
                                )}
                            </div>
                        </label>
                    </FormControl>
                );
            }}
        />
    );
};
