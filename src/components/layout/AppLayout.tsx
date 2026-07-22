// src/components/layout/AppLayout.tsx

import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate, useSidebarState } from "react-admin";
// import { Layout, CheckForApplicationUpdate, useSidebarState } from "react-admin";

import { AppMenu } from "./AppMenu";
import CustomAppBar from "./AppBar";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";

const drawerWidthOpen = 180;
const drawerWidthClosed = 60;

const CustomLayoutWrapper = styled(RALayout)(({ theme }) => ({
  "& .RaLayout-drawer": {
    width: drawerWidthOpen,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidthOpen,
      boxSizing: "border-box",
      overflowX: "hidden",
    },
  },
  "& .RaLayout-drawer.MuiDrawer-docked": {
    width: drawerWidthClosed,
    "& .MuiDrawer-paper": {
      width: drawerWidthClosed,
      overflowX: "hidden",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& .RaLayout-drawer": {
      width: drawerWidthOpen,
      "& .MuiDrawer-paper": {
        width: drawerWidthOpen,
      },
    },
    "& .RaLayout-drawer.MuiDrawer-docked": {
      width: drawerWidthOpen,
      "& .MuiDrawer-paper": {
        width: drawerWidthOpen,
      },
    },
  },
}));

export const AppLayout = ({ children }: { children: ReactNode }) => {
  const [open] = useSidebarState(); // サイドバーの開閉状態

  // RALayout と CustomLayoutWrapper を統合して JSX を1つにする
  return (
    <CustomLayoutWrapper
      menu={AppMenu}
      appBar={CustomAppBar}
      {...({ mobileDrawerProps: { PaperProps: { style: { width: drawerWidthOpen } } } } as any)}
      sx={{
        "& .RaLayout-content": {
          marginLeft: open ? -7 : 0,
          transition: "margin-left 0.3s ease",
          overflow: "hidden !important",
          position: "relative",
          display: "block",
        },
      }}
    >
      <Box sx={{ width: "100%", height: "100%" }}>
        {children} {/* ページ側で ScrollableDataGrid を使用 */}
      </Box>
      <CheckForApplicationUpdate />
    </CustomLayoutWrapper>

    // <Layout
    //   menu={AppMenu}
    //   appBar={CustomAppBar}
    //   drawerWidth={drawerWidthOpen} // permanent variant 用
    //   mobileDrawerProps={{
    //     PaperProps: {
    //       sx: { width: drawerWidthOpen }, // temporary variant 用
    //     },
    //   } as any} // 型エラーが出る場合は一時的に as any
    //   sx={{
    //     "& .RaLayout-content": {
    //       marginLeft: open ? -7 : 0,
    //       transition: "margin-left 0.3s ease",
    //       overflow: "hidden !important",
    //       position: "relative",
    //       display: "block",
    //     },
    //   }}
    // >
    //   <Box sx={{ width: "100%", height: "100%" }}>
    //     {children}
    //   </Box>
    //   <CheckForApplicationUpdate />
    // </Layout>
  );
};

// 共通で使える DataGrid コンポーネント
export const ScrollableDataGrid = (props: any) => {
  const apiRef = useGridApiRef();

  return (
    <Box sx={{ width: "100%", height: 400 }}>
      <DataGrid
        apiRef={apiRef}
        {...props}
        initialState={{
          ...props.initialState,
          scroll: { top: 0, left: 0 }, // 初期スクロール位置
        }}
        autoHeight
        columnBuffer={5} // 横スクロール時のバッファ
      />
    </Box>
  );
};
