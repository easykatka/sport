import { createContext } from 'react';
import { AppData } from 'shared/types/app-data';

const AppDataContext = createContext<AppData>({} as AppData);

export { AppDataContext };
