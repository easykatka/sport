import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';

export const FileInput = ({ title = 'Загрузить изображение' }) => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);

	return (
		<>
			<input
				accept="image/*"
				type="file"
				id="select-image"
				style={{ display: 'none' }}
				onChange={e => setSelectedImage(e.target.files[0])}
			/>
			<label htmlFor="select-image">
				<Button variant="contained" color="primary" component="span" className='mb-20'>
					{title}
				</Button>
			</label>
			{imageUrl && selectedImage && (
				<Box mt={2} textAlign="center">
					<div>Предпросмотр:</div>
					<img src={imageUrl} alt={selectedImage.name} height="200px" max-width='200px' />
				</Box>
			)}
		</>
	);
};

