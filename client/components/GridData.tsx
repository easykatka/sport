import React from 'react';
import { Grid } from '@mui/material';
import { FormField } from './FormField';

interface FormFieldProps {
	fields: {
		name: string,
		label: string
	}[]
}

export const GridData: React.FC<FormFieldProps> = ({ fields }) => {
	return (
		<Grid container spacing={2}>
			{fields.map(({ name, label }, index) => <Grid key={index} item xs={12} md={6} xl={4}>
				<FormField name={name} label={label} />
			</Grid>)}
		</Grid>
	);
};
