import { Admin, Resource } from "react-admin";
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
import { GoogleOAuthProvider } from "@react-oauth/google";
import Router from "./Router";
import { authProvider } from "./providers/authProvider";
import { LoginPage } from "./pages/LoginPage";

export const App = () => (
  <GoogleOAuthProvider clientId="616869349585-5kkpb0gvqlaq3kl4l67n6tq1nt6fee32.apps.googleusercontent.com">
    <Admin
      layout={AppLayout}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
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
      <Router />
    </Admin>
  </GoogleOAuthProvider>
);
