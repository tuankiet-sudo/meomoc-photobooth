'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-lora)',
    h1: {
      fontFamily: 'var(--font-paytone)',
    },
    h2: {
      fontFamily: 'var(--font-paytone)',
    },
    h3: {
      fontFamily: 'var(--font-paytone)',
    },
    h4: {
      fontFamily: 'var(--font-paytone)',
    },
    h5: {
      fontFamily: 'var(--font-lora)',
    },
    h6: {
      fontFamily: 'var(--font-lora)',
    },
    body1: {
      fontFamily: 'var(--font-lora)',
    },
    body2: {
      fontFamily: 'var(--font-lora)',
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#DE4C3E',
    },
    secondary: {
      main: '#E6B042',
    },
    info: {
      main: '#3D9273',
    },
    warning: {
      main: '#3F358C',
    },
    error: {
      main: '#D24464',
    },
    background: {
      default: '#F1E2C1',
      paper: '#F6EFE2',
    },
    text: {
      primary: '#2B2B2B',
      secondary: '#654E6A',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
