import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';

interface FormFieldProps {
    name: string;
    label: string;
    noErrorMessage?: boolean;
    endAdornment?: object;
    type?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, noErrorMessage = false, ...props }) => {
    const { register, formState } = useFormContext();

    return (
        <TextField
            {...register(name)}
            className='mb-20'
            size='small'
            variant='outlined'
            error={noErrorMessage ? undefined : !!formState.errors[name]?.message}
            helperText={noErrorMessage ? undefined : formState.errors[name]?.message}
            fullWidth
            {...props}
        />
    );
};
