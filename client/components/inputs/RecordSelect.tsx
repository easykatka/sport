import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Observer, useLocalObservable } from 'mobx-react';
import { Controller } from "react-hook-form";
import ReactHookFormSelect from './ReactHookFormSelect';

interface FormnameProps {
	name: string;
	label: string;
	//* проперти в энтити
	property?: string;
	model: any;
	computed?: (record: any) => string;
}

export const RecordSelect: React.FC<FormnameProps> = ({ name, label, model, property, computed }) => {
	const state = useLocalObservable(() => ({ records: [], }));
	const fetchRecord = async () => (state.records = await model.getAll());
	useEffect(() => { fetchRecord(); }, []);

	const { register, formState } = useFormContext();
	const getError = (name: string) => formState.errors[name]?.message;
	const renderLabel = (error: string, defaultLabel: string) => (error ? <span style={{ color: 'red' }}>{error}</span> : defaultLabel);
	const _label = renderLabel(getError(name), label);
	const labelId = `${name}-label`;

	return <Observer>{() => (
		<FormControl fullWidth>
			{/* <InputLabel size='small' id={labelId}>{_label}</InputLabel>
			<Select
				className='mb-20'
				size='small'
				control={control}
				error={!!formState.errors[name]?.message}
				label={_label}
			>
				{state.records.map((record) => (
					<MenuItem key={record.id} value={record.id}>
						{computed ? computed(record) : record[property]}
					</MenuItem>
				))}
			</Select> */}


			<TextField
				select
				className='mb-20'
				size='small'
				label={_label}
				id={labelId}
				error={!!formState.errors[name]?.message}
				{...register(name)}
			>
				{state.records.map((record) => (
					<MenuItem key={record.id} value={record.id}>
						{computed ? computed(record) : record[property]}
					</MenuItem>
				))}
			</TextField>
		</FormControl>
	)}</Observer>;
};
