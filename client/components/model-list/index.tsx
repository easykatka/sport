import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import router from 'next/router';
// import styles from './ModelList.module.scss';

export const ModelList = ({ records, columns }) => {
	const onAddClick = () => router.push(`${router.asPath}/add`);

	return (
		<>
			<Button className='mb-20' color='primary' variant='contained' onClick={onAddClick} size='large'>
				Добавить
			</Button>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((col) => (
								<TableCell key={col.label}>{col.label}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{records.map((record) => (
							<TableRow hover key={record.id} onClick={() => router.push(`${router.asPath}/${record.id}`)}>
								{columns.map(({ field, relation }, index) => {
									const label = relation ? record[relation]?.[field] : record[field];
									return <TableCell key={index}>{label}</TableCell>;
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};
