import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Observer, useLocalObservable } from 'mobx-react';

interface FormFieldProps {
	name: string;
	label: string;
	property: string;
	model: any;
	computed?: (record: any) => string;
}

export const RecordSelect: React.FC<FormFieldProps> = ({ name, label, model, property, computed }) => {
	const state = useLocalObservable(() => ({
		records: [],
	}));

	const fetchRecord = async () => (state.records = await model.getAll());

	useEffect(() => {
		fetchRecord();
	}, []);

	const { register, formState } = useFormContext();
	const getError = (field: string) => formState.errors[field]?.message;
	const renderLabel = (error: string, defaultLabel: string) => (error ? <span style={{ color: 'red' }}>{error}</span> : defaultLabel);
	const labels = renderLabel(getError(name), label);

	return <Observer>{() => (
		<FormControl fullWidth>
			<InputLabel size='small' id={label}>
				{labels}
			</InputLabel>
			<Select
				labelId={label}
				className='mb-20'
				size='small'
				{...register(name)}
				id='demo-simple-select'
				error={!!formState.errors[name]?.message}
				label={renderLabel(getError(name), label)}
			>
				{state.records.map((record) => (
					<MenuItem key={record.id} value={record.id}>
						{computed ? computed(record) : record[property]}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)}</Observer>;
};
