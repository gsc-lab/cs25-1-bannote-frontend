// src/components/layout/AppMenu.tsx
import { Menu } from "react-admin";

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
        minWidth: 36,
        color: menuDefault,
        transition: "color 0.2s ease",
      },
      "& .RaMenuItemLink-root:hover .RaMenuItemLink-icon": { color: menuHover },
      "& .RaMenuItemLink-root.RaMenuItemLink-active .RaMenuItemLink-icon": { color: menuActive },
      "& .RaMenuItemLink-root.RaMenuItemLink-disabled .RaMenuItemLink-icon": { color: menuDisabled },
    }}
    PaperProps={{ style: { width: 180 } }} // ←モバイル Drawer の幅も 180 に固定
  >
    <Menu.ResourceItem name="departments" />
    <Menu.ResourceItem name="studentclasses" />
    <Menu.ResourceItem name="users" />
    <Menu.ResourceItem name="alloweddomains" />
    <Menu.ResourceItem name="groupitems" />
  </Menu>
);
