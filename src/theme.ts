'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    primary: {
      main: '#00796B',
    },
    secondary: {
      main: '#FFB300',
    },
    background: {
      default: '#fafafa',
    },
  },
});

export default theme;
