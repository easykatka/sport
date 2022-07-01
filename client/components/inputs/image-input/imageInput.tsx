import { useState, useEffect } from 'react';
import NextImage from 'next/image';
import styles from './image-input.module.scss';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl } from '@mui/material';
import styled from '@emotion/styled';

const Input = styled('input')({
    display: 'none',
});

export const ImageInput = ({ title = 'Загрузить изображение', label, width = 250, height = 250, name }) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const { formState, control } = useFormContext();

    const handleCapture = (e, field) => {
        const file = e.target.files[0];
        if (!file) return;
        field.onChange(file);
        const reader = new FileReader();
        reader.onload = function (e) {
            setImagePreviewUrl(e.target.result);
        };
        reader.readAsDataURL(file);
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
                    <label htmlFor='select-image' id={labelId} className={styles.imageInput}>
                        {_label}
                        <input accept='image/*' id='select-image' type='file' onChange={(e) => handleCapture(e, field)} />
                        <div style={{ width, height }} className={imagePreviewUrl ? styles.preview : styles.noImage}>
                            {imagePreviewUrl ? (
                                <NextImage src={imagePreviewUrl} alt={field.value?.name} height={height} width={width} objectFit='contain' />
                            ) : (
                                title
                            )}
                        </div>
                    </label>
                );
            }}
        />
    );
};
