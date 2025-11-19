import { Admin, CustomRoutes, Resource } from "react-admin";
import { i18nProvider } from "./i18n"; 
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
import ClassIcon from "@mui/icons-material/Class";
import PersonIcon from "@mui/icons-material/Person";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Route } from "react-router-dom";
import { authProvider } from "./providers/authProvider";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import theme from "./theme";
import { AllowedDomainCreate, AllowedDomainList } from "./pages/AllowedDomains";
import { GroupItemList } from "./components/schedule/GroupItemList"

export const App = () => (
  <Admin
    layout={AppLayout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    theme={theme} 
  >
    <Resource
      name="departments"
      list={DepartmentList}
      create={DepartmentCreate}
      edit={DepartmentEdit}
      recordRepresentation="department_code"
      icon={PlayArrowRoundedIcon}
      options={{ label: "학과" }}
    />
    <Resource
      name="studentclasses"
      list={StudentClassList}
      create={StudentClassCreate}
      edit={StudentClassEdit}
      recordRepresentation="student_class_code"
      icon={PlayArrowRoundedIcon}
      options={{ label: "학급" }}
    />
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
      recordRepresentation="user_code"
      icon={PlayArrowRoundedIcon}
      options={{ label: "유저" }}

    />
    <Resource
      name="alloweddomains"
      list={AllowedDomainList}
      create={AllowedDomainCreate}
      options={{ label: "승인" }}
      icon={PlayArrowRoundedIcon}
    />
    <Resource
      name="groupitems"
      list={GroupItemList}
      options={{ label: "アイテム" }}
      icon={PlayArrowRoundedIcon}
    />

    <CustomRoutes noLayout>
      <Route path="/register" element={<RegisterPage />} />
    </CustomRoutes>
  </Admin>
);
