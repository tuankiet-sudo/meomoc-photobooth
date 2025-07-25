"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    background: {
      default: "#ffffff",
    },
    primary: {
      main: "#880000",
    },
    secondary: {
      main: "#493528",
    },
    text: {
      primary: "#000000",
    },
  },
  typography: {
    // Set Paytone One as the default font for everything
    fontFamily: "var(--font-paytone-one), sans-serif", 
    h1: {
      color: "#880000",
      fontWeight: 400,
      fontSize: "2.5rem",
    },
    h2: {
      color: "#880000",
      fontWeight: 400,
      fontSize: "1.5rem",
    },
    h4: {
      color: "#493528",
      fontWeight: 400,
      fontSize: "1.2rem",
    },
    h5: {
      fontSize: "1.1rem",
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.9rem",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

theme = responsiveFontSizes(theme, { factor: 3 });

export default theme;