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
		MuiIconButton: {
			styleOverrides: {
				root: {
					'&:hover': {
						color: '#4683d9',
						backgroundColor: 'unset'
					}
				}
			}
		},

		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: '8px',
					textTransform: 'inherit',
					fontSize: 16,
					transition: 'none',
					color: '#000',
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
					backgroundColor: '#1a1a1a',
					color: 'white',
					'&:hover': {
						backgroundColor: '#262626',
						color: 'white',
					},
				},
			},
		},
	},
	palette: {
		primary: {
			main: '#4683d9',
		},
		secondary: {
			main: "#000",
		}
	},
});
