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
import ClassIcon from "@mui/icons-material/Class";
import PersonIcon from "@mui/icons-material/Person";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Route } from "react-router-dom";
import { authProvider } from "./providers/authProvider";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import theme from "./theme";
import { AllowedDomainCreate, AllowedDomainList } from "./pages/AllowedDomains";
import { GroupItemList } from "./components/schedule/GroupItemList";
import SellIcon from "@mui/icons-material/Sell";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import {
  StudyroomList,
  StudyroomCreate,
  StudyroomEdit,
} from "./pages/StudyroomPage";
import { ScheduleMain } from "./components/schedule/ScheduleMain";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";

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
      icon={Diversity1Icon}
      options={{ label: "학과" }}
    />
    <Resource
      name="studentclasses"
      list={StudentClassList}
      create={StudentClassCreate}
      edit={StudentClassEdit}
      recordRepresentation="student_class_code"
      icon={RecentActorsIcon}
      options={{ label: "학급" }}
    />
    <Resource
      name="users"
      list={UserList}
      create={UserCreate}
      edit={UserEdit}
      recordRepresentation="user_code"
      icon={AccountBoxIcon}
      options={{ label: "유저" }}
    />
    <Resource
      name="alloweddomains"
      list={AllowedDomainList}
      create={AllowedDomainCreate}
      options={{ label: "승인" }}
      icon={HowToRegIcon}
    />
    <Resource
      name="groupitems"
      list={GroupItemList}
      options={{ label: "태그" }}
      icon={SellIcon}
    />
    <Resource
      name="calendar"
      list={ScheduleMain}
      options={{ label: "캘린더" }}
      icon={CalendarViewWeekIcon}
    />

    <Resource
      name="studyrooms"
      // @ts-ignore
      list={StudyroomList}
      create={StudyroomCreate}
      edit={StudyroomEdit}
      options={{ label: "스터디룸 관리" }}
      icon={ClassIcon}
    />
    <Resource name="room-operating" />
    <Resource name="room-exception" />

    <CustomRoutes noLayout>
      <Route path="/register" element={<RegisterPage />} />
    </CustomRoutes>
  </Admin>
);
