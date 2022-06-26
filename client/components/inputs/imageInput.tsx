import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import NextImage from 'next/image';


export const ImageInput = ({ title = 'Загрузить изображение', onChange }) => {
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
        <>
            <input accept='image/*' type='file' id='select-image' style={{ display: 'none' }} onChange={handleCapture} />
            <label htmlFor='select-image'>
                <Button variant='contained' color='primary' component='span' className='mb-20'>
                    {title}
                </Button>
            </label>
            {imageUrl && selectedImage && (
                <Box mt={2} textAlign='center'>
                    <div>Предпросмотр:</div>
                    <NextImage src={imageUrl} alt={selectedImage.name} height='300px' width='300px' layout='responsive' />
                </Box>
            )}
        </>
    );
};
