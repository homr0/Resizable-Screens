import React, { useMemo } from "react";
import { CssBaseline, useMediaQuery } from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { green, purple } from '@material-ui/core/colors';

import "../styles/styles.css";

const light = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

const dark = createTheme({
  palette: {
    mode: "dark"
  }
});

const MyApp = ({ Component, pageProps }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(() => prefersDarkMode ? dark : light,
    [prefersDarkMode]
  );

  return (<ThemeProvider theme={theme}>
    <CssBaseline />
    <Component {...pageProps} />
  </ThemeProvider>);
};

export default MyApp;
