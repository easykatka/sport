import { createTheme } from '@mui/material';

export const theme = createTheme({
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    palette: {
        primary: {
            main: '#4683d9',
        },
    },
});
