import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Observer, useLocalObservable } from 'mobx-react';

interface FormnameProps {
	name: string;
	label: string;
	//* проперти в энтити
	property?: string;
	model: any;
	computed?: (record: any) => string;
}

export const RecordSelect: React.FC<FormnameProps> = ({ name, label, model, property, computed }) => {
	const [records, setRecords] = useState([])
	const state = useLocalObservable(() => ({ records: [], }));
	const fetchRecord = async () => (state.records = await model.getAll());
	useEffect(() => { fetchRecord(); }, []);

	const { register, formState, getValues } = useFormContext();
	const getError = (name: string) => formState.errors[name]?.message;
	const renderLabel = (error: string, defaultLabel: string) => (error ? <span style={{ color: 'red' }}>{error}</span> : defaultLabel);
	const _label = renderLabel(getError(name), label);
	const labelId = `${name}-label`;
	const defaultValue = getValues()[name];

	return (
		<FormControl fullWidth>
			<Observer>{() =>
				<TextField
					// {...register(name)}

					className='mb-20'
					size='small'
					label={_label}
					id={labelId}
					error={!!formState.errors[name]?.message}
					select
					defaultValue={defaultValue || ""}
					inputProps={{
						inputRef: (ref) => {
							if (!ref) return;
							register(name);
						},
					}}
				>
					{
						state.records.map((record) => <MenuItem key={record.id} value={record.id}>
							{computed ? computed(record) : record[property]}
						</MenuItem>)
					}
				</TextField>
			}
			</Observer>
		</FormControl >
	)
};

