import { Admin, Authenticated, CustomRoutes, Resource } from "react-admin";
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
import { ItemModal } from "./components/schedule/ItemModal";
import theme from "./theme";
import { AllowedDomainCreate, AllowedDomainList } from "./pages/AllowedDomains";
import { GroupItemList } from "./components/schedule/GroupItemList";
import SellIcon from "@mui/icons-material/Sell";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import StarsIcon from "@mui/icons-material/Stars";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  StudyroomList,
  StudyroomCreate,
  StudyroomEdit,
} from "./pages/StudyroomPage";
import { ScheduleMain } from "./components/schedule/ScheduleMain";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import Settings from "./pages/Settings";
import Reservation from "./pages/Reservation";
import { TagsCreate, TagsList } from "./pages/Tags";
import {
  ScheduleGroupsCreate,
  ScheduleGroupsEdit,
  ScheduleGroupsList,
} from "./pages/ScheduleGroups";

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
      name="schedule-tags"
      list={TagsList}
      create={TagsCreate}
      options={{ label: "태그 관리" }}
    />
    <Resource
      name="schedule-groups"
      list={ScheduleGroupsList}
      create={ScheduleGroupsCreate}
      edit={ScheduleGroupsEdit}
      options={{ label: "스케줄 그룹" }}
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
    {/* <Resource
      name="item_modal"
      list={ItemModal}
      options={{ label: "아이템 모달" }}
      icon={AddBoxIcon}
    /> */}

    <Resource
      name="studyrooms"
      // @ts-ignore
      list={StudyroomList}
      create={StudyroomCreate}
      edit={StudyroomEdit}
      options={{ label: "예약 상황" }}
      icon={StarsIcon}
    />
    <Resource name="room-operating" />
    <Resource name="room-exception" />

    <Resource name="reservation" options={{ label: "스터디룸 예약" }} />
    <Resource name="reservations" />
    {/* ヘッダーやメニュー付きで表示したいページ */}
    <CustomRoutes>
      <Route path="/settings" element={<Settings />} />
      <Route
        path="/reservation"
        element={
          <Authenticated>
            <Reservation />
          </Authenticated>
        }
      />
      {/* <Route path="/item-modal" element={<ItemModalPage />} /> */}
    </CustomRoutes>

    {/* ログイン・登録などのヘッダー不要ページ */}
    <CustomRoutes noLayout>
      <Route path="/register" element={<RegisterPage />} />
    </CustomRoutes>
  </Admin>
);
