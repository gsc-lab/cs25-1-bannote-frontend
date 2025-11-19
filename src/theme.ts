// src/theme.ts

import { createTheme } from "@mui/material/styles";

const navy = "#172C66";
const red = "#A10000";

// メニュー用カラー
const menuDefault = "#5A6B8C";  // 通常：薄紺
const menuHover = "#243A73";    // hover：濃紺
const menuActive = "#172C66";   // active：基調の紺
const menuDisabled = "#95A1BB"; // disabled：薄グレー紺

const theme = createTheme({
  palette: {
    primary: { main: navy },
    error: { main: red },
    background: { default: "#FEF6E4" },
    text: { primary: navy, secondary: navy },
  },

  typography: {
    allVariants: {
      color: navy,
    },
  },

  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 180, // permanent / temporary 両方の Drawer の幅を180pxに固定
        },
      },
    },
    /* --------------------------------
     * AppBar
     -------------------------------- */
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: { backgroundColor: navy },
      },
    },

    /* --------------------------------
     * TextField / Input
     -------------------------------- */
    MuiTextField: {
      defaultProps: { variant: "outlined" },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: { fontSize: "0.75rem", color: red },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: { color: navy, "&.Mui-error": { color: red } },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          color: navy,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: navy },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: navy },
          "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: red },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: { color: navy },
        icon: { color: navy },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          color: navy,
          "& .MuiOutlinedInput-notchedOutline": { borderColor: navy },
        },
        popupIndicator: { color: navy },
      },
    },

    /* ----------------------------------------------------
     * 🔵 メニュー（ListItemButton / ListItemIcon）
     * 通常 → hover → active の濃淡をはっきり設定
     * ---------------------------------------------------- */

    // ListItemButton
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: menuDefault,                 // 通常：薄紺
          transition: "all 0.2s ease",

          "&:hover": {
            color: menuHover,                 // hover：濃紺
            backgroundColor: "rgba(23,44,102,0.08)",
          },

          "&.Mui-selected": {
            color: menuActive,                // active：さらに濃い紺
            backgroundColor: "rgba(23,44,102,0.15)",
            fontWeight: 600,

            "&:hover": {
              backgroundColor: "rgba(23,44,102,0.20)", // active + hover
            },
          },

          "&.Mui-disabled": {
            color: menuDisabled,
          },
        },
      },
    },

    // ListItemIcon（テキストと完全連動）
    MuiListItemIcon: {
      styleOverrides: {

        root: {
          color: menuDefault,
          transition: "color 0.2s ease",

          // hover のとき
          ".MuiListItemButton-root:hover &": {
            color: menuHover,
          },

          // active のとき
          ".MuiListItemButton-root.Mui-selected &": {
            color: menuActive,
          },

          ".Mui-disabled &": {
            color: menuDisabled,
          },
        },
      },
    },
  },
});

export default theme;
