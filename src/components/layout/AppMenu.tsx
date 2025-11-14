import { Menu } from "react-admin";

export const AppMenu = () => (
  <Menu>
    <Menu.ResourceItem name="departments" />
    <Menu.ResourceItem name="studentclasses" />
    <Menu.ResourceItem name="users" />
  </Menu>
);
