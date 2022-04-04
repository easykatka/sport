import { useAppData } from 'client/ssr/useAppData';

const useFeature = (feature: string, defaultValue = false) => {
    return useAppData().features[feature] || defaultValue;
};

export { useFeature };
