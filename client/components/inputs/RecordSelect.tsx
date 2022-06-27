import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Observer, useLocalObservable } from 'mobx-react';
import { runInAction } from 'mobx';

interface FormnameProps {
    name: string;
    label: string;
    //* проперти в энтити
    property?: string;
    service: any;
    computed?: (record: any) => string;
}

export const RecordSelect: React.FC<FormnameProps> = ({ name, label, service, property, computed }) => {
    const [records, setRecords] = useState([]);
    const fetchRecord = async () => setRecords(await service.getAll());
    useEffect(() => {
        fetchRecord();
    }, []);
    const { formState, control } = useFormContext();
    if (records.length === 0) return null;

    const getError = (name: string) => formState.errors[name]?.message;
    const renderLabel = (error: string, defaultLabel: string) => (error ? <span style={{ color: 'red' }}>{error}</span> : defaultLabel);
    const _label = renderLabel(getError(name), label);
    const labelId = `${name}-label`;
    return (
        <Controller
            control={control}
            name={name}
            defaultValue={''}
            render={({ field, fieldState }) => {
                return (
                    <FormControl fullWidth>
                        <InputLabel size='small' id={labelId}>
                            {_label}
                        </InputLabel>
                        <Select
                            size='small'
                            className='mb-20'
                            id='stackoverflow-select'
                            label={_label}
                            labelId={labelId}
                            error={!!formState.errors[name]?.message}
                            {...field}>
                            {records.map((record) => (
                                <MenuItem key={record.id} value={record.id}>
                                    {computed ? computed(record) : record[property]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );
            }}
        />
    );
};
