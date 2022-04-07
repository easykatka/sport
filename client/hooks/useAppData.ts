import { useContext } from 'react';
import { AppDataContext } from '../ssr/appData';

export const useAppData = () => {
    return useContext(AppDataContext);
};
