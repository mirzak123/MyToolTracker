'use client'

import { createTheme } from "@mui/material/styles";
import { orange, purple } from "@mui/material/colors";
import { enUS } from "@mui/material/locale";
// croatian locale
// import { hrHR } from "@mui/material/locale";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: orange,
    secondary: purple,
  },
}, enUS);

export default theme;
