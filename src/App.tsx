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
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";

export const App = () => (
  <Admin layout={AppLayout} dataProvider={dataProvider}>
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
  </Admin>
);
