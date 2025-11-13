import { AppBar, Logout, UserMenu, useUserMenu } from "react-admin";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Link } from "react-router";

const SettingsMenuItem = React.forwardRef<HTMLAnchorElement>((props, ref) => {
  const userMenuContext = useUserMenu();
  if (!userMenuContext) {
    throw new Error("<SettingsMenuItem> should be used inside a <UserMenu>");
  }
  const { onClose } = userMenuContext;
  return (
    <MenuItem
      onClick={onClose}
      ref={ref}
      component={Link}
      to="/settings" // TODO 설정 페이지 구현 필요
      {...props}
    >
      <ListItemIcon>
        <SettingsIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Customize</ListItemText>
    </MenuItem>
  );
});

const CustomAppBar = () => {
  return (
    <AppBar
      userMenu={
        <UserMenu>
          <SettingsMenuItem />
          <Logout />
        </UserMenu>
      }
    />
  );
};

export default CustomAppBar;
