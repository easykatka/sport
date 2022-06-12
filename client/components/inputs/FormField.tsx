import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

interface FormFieldProps {
    name: string;
    label: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, ...props }) => {
    const { register, formState } = useFormContext();
    const getError = (field: string) => formState.errors[field]?.message;
    const renderLabel = (error: string, defaultLabel: string) => (error ? <span style={{ color: 'red' }}>{error}</span> : defaultLabel);

    return (
        <TextField
		
            {...register(name)}
            label={renderLabel(getError(name), label)}
            className='mb-20'
            size='small'
            variant='outlined'
            error={!!formState.errors[name]?.message}
            fullWidth
            {...props}
        />
    );
};
