"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    background: {
      default: "#eaddc1",
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
    fontFamily: "var(--font-geist-sans)",
    h1: {
      color: "#880000",
      fontWeight: 700,
      fontSize: "2.5rem", // Reduced size
    },
    h2: {
      color: "#880000",
      fontWeight: 600,
      fontSize: "1.5rem", // Reduced size
    },
    h4: {
      color: "#493528",
      fontWeight: 600,
      fontSize: "1.1rem", // Reduced size
    },
    h5: {
      fontSize: "1.1rem", // Reduced size
      fontWeight: 600,
    },
    body1: {
      color: "black",
      fontSize: "0.9rem", // Reduced size
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        size: "small", // Make all buttons smaller
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
        size: "small", // Make all text fields smaller
        variant: "outlined",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small", // Make all selects smaller
      },
    },
    MuiInputLabel: {
      defaultProps: {
        size: "small",
      },
    },
  },
});

theme = responsiveFontSizes(theme, { factor: 3 }); // Adjust responsive scaling

export default theme;