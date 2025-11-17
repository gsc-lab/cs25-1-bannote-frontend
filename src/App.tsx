import { Admin, CustomRoutes, Resource } from "react-admin";
import { AppLayout } from "./components/layout/AppLayout";
import { dataProvider } from "./providers/dataProvider";
import {
  DepartmentCreate,
  DepartmentEdit,
  DepartmentList,
} from "./pages/departments";
import {
  StudentClassCreate,
  StudentClassEdit,
  StudentClassList,
} from "./pages/studentclass";
import { UserCreate, UserEdit, UserList } from "./pages/Users";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import PersonIcon from "@mui/icons-material/Person";
import { Route } from "react-router-dom";
import { authProvider } from "./providers/authProvider";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import theme from "./theme";
import { AllowedDomainCreate, AllowedDomainList } from "./pages/AllowedDomains";

export const App = () => (
  <Admin
    layout={AppLayout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    theme={theme} // ← ここでテーマを適用
  >
    <Resource
      name="departments"
      list={DepartmentList}
      create={DepartmentCreate}
      edit={DepartmentEdit}
      recordRepresentation="department_code"
      icon={SchoolIcon}
    />
    <Resource
      name="studentclasses"
      list={StudentClassList}
      create={StudentClassCreate}
      edit={StudentClassEdit}
      recordRepresentation="student_class_code"
      icon={ClassIcon}
    />
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
      recordRepresentation="user_code"
      icon={PersonIcon}
    />
    <Resource
      name="alloweddomains"
      list={AllowedDomainList}
      create={AllowedDomainCreate}
    />
    <CustomRoutes noLayout>
      <Route path="/register" element={<RegisterPage />} />
    </CustomRoutes>
  </Admin>
);
