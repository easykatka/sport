import { createTheme } from '@mui/material';

export const theme = createTheme({
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiPaper: {
            styleOverrides: {
                rounded: {
                    borderRadius: 8,
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    boxShadow: 'none',
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'inherit',
                    fontSize: 16,
                    transition: 'none',
					color : '#000',
                    '&:active': {
                        boxShadow:
                            '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 0%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%) !important',
                        transform: 'translateY(1px)',
                    },
                },
                contained: {
                    backgroundColor: 'white',
                    boxShadow:
                        '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 5%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%)',
                    '&:hover': {
                        backgroundColor: 'white',
                        boxShadow:
                            '0 1px 1px rgb(0 0 0 / 18%), 0 4px 7px rgb(0 0 0 / 8%), 0 -1px 0 rgb(0 0 0 / 8%), -1px 0 0 rgb(0 0 0 / 8%), 1px 0 0 rgb(0 0 0 / 15%)',
                    },
                },
                containedPrimary: {
                     backgroundColor: 'white',
                    boxShadow:
                        '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 5%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%)',
                    '&:hover': {
                        backgroundColor: 'white',
                        boxShadow:
                            '0 1px 1px rgb(0 0 0 / 18%), 0 4px 7px rgb(0 0 0 / 8%), 0 -1px 0 rgb(0 0 0 / 8%), -1px 0 0 rgb(0 0 0 / 8%), 1px 0 0 rgb(0 0 0 / 15%)',
                    },
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#4683d9',
        },
    },
});
