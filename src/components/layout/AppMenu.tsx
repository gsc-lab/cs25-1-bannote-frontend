// src/components/layout/AppMenu.tsx
import { Typography } from "@mui/material";
import { Menu } from "react-admin";
import Box from "@mui/material/Box";
import SchoolIcon from "@mui/icons-material/School";
import EventNoteIcon from '@mui/icons-material/EventNote';



const menuDefault = "#cfd7e9ff";
const menuHover = "#a4b1d3ff";
const menuActive = "#fef6e4";   // アクティブはアクセントカラー
const menuDisabled = "#95A1BB";

export const AppMenu = () => (
  <Menu
    sx={{
      width: 100,
      height: "100vh",
      background: "linear-gradient(to bottom, #0d235eff, #142f5eff)",
      boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
      transition: "width 0.3s ease",

      "&.RaMenu-open": { width: 180 },
      "&.RaMenu-closed": { width: 60 },

      "& .RaMenuItemLink-root": {
        color: menuDefault,
        padding: "12px 16px",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        transition: "all 0.2s ease",
        "&:hover": {
          color: menuHover,
          backgroundColor: "rgba(255,255,255,0.08)",
        },
        "&.RaMenuItemLink-active": {
          color: menuActive,
          backgroundColor: "rgba(255,204,0,0.1)",
          borderLeft: `4px solid ${menuActive}`,
        },
        "&.RaMenuItemLink-disabled": {
          color: menuDisabled,
          backgroundColor: "rgba(255,255,255,0.05)",
        },
      },
      "& .RaMenuItemLink-icon": {
        maxWidth: 30,
        // fontSize: 15,   
        color: menuDefault,
        transition: "color 0.2s ease",
      },
      "& .RaMenuItemLink-root:hover .RaMenuItemLink-icon": { color: menuHover },
      "& .RaMenuItemLink-root.RaMenuItemLink-active .RaMenuItemLink-icon": { color: menuActive },
      "& .RaMenuItemLink-root.RaMenuItemLink-disabled .RaMenuItemLink-icon": { color: menuDisabled },

      // メニュー閉じたときはテキストを非表示
      "&.RaMenu-closed .RaMenuItemLink-text": { display: "none" },
      "&.RaMenu-closed .menu-section-text": { display: "none" },
      "& .RaMenuItemLink-icon svg": {fontSize: 20},
    }}
    PaperProps={{ style: { width: 180 } }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1 }}>
      <SchoolIcon sx={{ color: "white" }} />
      <Typography className="menu-section-text" sx={{ color: "white", fontWeight: "bold" }}>
        학생 정보
      </Typography>
    </Box>
    <Menu.ResourceItem name="departments" />
    <Menu.ResourceItem name="studentclasses" />
    <Menu.ResourceItem name="users" />
    <Menu.ResourceItem name="alloweddomains" />

    <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1, mt: 3 }}>
      <EventNoteIcon sx={{ color: "white" }} />
      <Typography className="menu-section-text" sx={{ color: "white", fontWeight: "bold" }}>
        일정 관리
      </Typography>
    </Box>
    <Menu.ResourceItem name="groupitems" />
    <Menu.ResourceItem name="calendar" />

  </Menu>
);
