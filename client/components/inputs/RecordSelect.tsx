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
	model: any;
	computed?: (record: any) => string;
}

export const RecordSelect: React.FC<FormnameProps> = ({ name, label, model, property, computed }) => {
	const [records, setRecords] = useState([]);
	const fetchRecord = async () => (setRecords(await model.getAll()));
	useEffect(() => { fetchRecord(); }, []);

	const { register, formState, getValues, control } = useFormContext();
	const getError = (name: string) => formState.errors[name]?.message;
	const renderLabel = (error: string, defaultLabel: string) => (error ? <span style={{ color: 'red' }}>{error}</span> : defaultLabel);
	const _label = renderLabel(getError(name), label);
	const labelId = `${name}-label`;
	const defaultValue = getValues()[name];

	return <FormControl fullWidth>
		<InputLabel size='small' id={labelId}>{_label}</InputLabel>
		<Select
			{...register(name)}
			className='mb-20'
			size='small'
			error={!!formState.errors[name]?.message}
			label={_label}

			defaultValue={defaultValue || ""}
		>
			{records.map((record) => (
				<MenuItem key={record.id} value={record.id}>
					{computed ? computed(record) : record[property]}
				</MenuItem>
			))}
		</Select>
	</FormControl>
};

