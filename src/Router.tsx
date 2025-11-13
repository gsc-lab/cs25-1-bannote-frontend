import { CustomRoutes } from "react-admin";
import { Route } from "react-router";
import { LoginPage } from "./pages/LoginPage";

const Router = () => {
  return (
    <>
      <CustomRoutes noLayout>
        <Route path="/login" element={<LoginPage />} />
      </CustomRoutes>
      <CustomRoutes>
        <Route />
      </CustomRoutes>
    </>
  );
};

export default Router;
