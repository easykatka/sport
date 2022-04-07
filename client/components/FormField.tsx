import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

interface FormFieldProps {
    name: string;
    label: string;
    noErrorMessage?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, noErrorMessage = false }) => {
    const { register, formState } = useFormContext();

    return (
        <TextField
            {...register(name)}
            name={name}
            className='mb-20'
            size='small'
            label={label}
            variant='outlined'
            error={noErrorMessage ? undefined : !!formState.errors[name]?.message}
            helperText={noErrorMessage ? undefined : formState.errors[name]?.message}
            fullWidth
        />
    );
};
