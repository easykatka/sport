import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const PasswordInput = ({ name, label }) => {
    const { register, formState } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);
    const onShowPasswordChange = () => setShowPassword(!showPassword);
    const getError = (field: string) => formState.errors[field]?.message;
    const renderLabel = (error: string, defaultLabel: string) => (error ? <span style={{ color: 'red' }}>{error}</span> : defaultLabel);

    return (
        <FormControl fullWidth variant='outlined' size='small'>
            <InputLabel htmlFor='outlined-adornment-password'>{renderLabel(getError('password'), label)}</InputLabel>
            <OutlinedInput
                {...register('password')}
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                className='mb-20'
                label={formState.errors.password?.message || 'Пароль'}
                fullWidth
                error={!!formState.errors[name]?.message}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton aria-label='toggle password visibility' onClick={onShowPasswordChange} onMouseDown={onShowPasswordChange} edge='end'>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};
