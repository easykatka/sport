import { useAppData } from 'client/hooks/useAppData';

export const useFeature = (feature: string, defaultValue = false) => {
    return useAppData().features[feature] || defaultValue;
};
