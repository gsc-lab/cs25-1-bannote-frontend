// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#172C66", // 紺
    },
    error: {
      main: "#A10000", // 赤を統一
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          color: "#A10000", // エラーメッセージ赤に統一
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-error": {
            color: "#A10000", // エラー時ラベル赤
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "inherit",
          },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "#A10000",
          },
        },
        notchedOutline: {},
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#172C66", // アイコン色は紺に固定
        },
      },
    },
  },
});

export default theme;
