export const fio = record => (record.lastname || record.firstname || record.middleName) ?
	`${record.lastname || ''} ${record.firstname || ''} ${record.middleName || ''}`
	:
	record.email;

export const fioShort = record => (record.lastname || record.firstNname || record.middleName) ?
	`${record.lastname} ${record.firstname ? record.firstname.substr(0, 1) + '.' : ''} ${record.middlename ? record.middlename.substr(0, 1) + '.' : ''}`
	:
	record.email;