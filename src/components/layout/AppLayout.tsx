import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { AppMenu } from "./AppMenu";
import CustomAppBar from "./AppBar";

export const AppLayout = ({ children }: { children: ReactNode }) => (
  <RALayout menu={AppMenu} appBar={CustomAppBar}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
