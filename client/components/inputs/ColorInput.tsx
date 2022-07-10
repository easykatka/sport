import { FormControl, InputLabel, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ColorPicker as MUIColorPicker, createColor } from 'material-ui-color';

interface FormFieldProps {
    name: string;
    label: string;
}

export const ColorPicker: React.FC<FormFieldProps> = ({ name, label }) => {
    const { formState, control } = useFormContext();
    const getError = (field: string) => formState.errors[field]?.message;
    const renderLabel = (error: string, defaultLabel: string) => (error ? <span className='error'>{error}</span> : defaultLabel);
    const _label = renderLabel(getError(name), label);

    return (
        <Controller
            control={control}
            name={name}
            defaultValue='white'
            render={({ field }) => {
                return (
                    <FormControl>
                        <div>
                            <div style={{ position: 'absolute', height: 10, width: 10, top: 5, right: 35, zIndex: 10 }}>
                                <MUIColorPicker onChange={({ css }) => field.onChange(css.backgroundColor)} value={field.value} hideTextfield />
                            </div>
                            <TextField
                                onChange={field.onChange}
                                label={_label}
                                className='mb-20'
                                size='small'
                                variant='outlined'
                                error={!!formState.errors[name]?.message}
                            />
                        </div>
                    </FormControl>
                );
            }}
        />
    );
};
