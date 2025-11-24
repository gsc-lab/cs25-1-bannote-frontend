// src/pages/Users.tsx

import {
  AutocompleteInput,
  Create,
  DataTable,
  DeleteButton,
  Edit,
  EditButton,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  useGetList,
  useRedirect,
} from "react-admin";

import { useWatch, useFormContext } from "react-hook-form";
import { useEffect, useRef } from "react";

import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Box,
  Stack,
  Button,
} from "@mui/material";

import AvatarField from "../components/common/AvatarField";
import RolesField from "../components/common/RolesField";

// =================================================
//   Student Class Filter (Dependent Dropdown)
// =================================================
const StudentClassFilter = (props: any) => {
  const departmentCode = useWatch({ name: "department_code" });
  const { setValue } = useFormContext();
  const prevDepartmentCode = useRef(departmentCode);

  const { data: studentClasses, isLoading } = useGetList("studentclasses", {
    filter: departmentCode ? { department_code: departmentCode } : {},
    pagination: { page: 1, perPage: 100 },
  });

  const choices = studentClasses
    ? studentClasses.map((sc) => ({ id: sc.id, name: sc.name }))
    : [];

  useEffect(() => {
    if (prevDepartmentCode.current !== departmentCode) {
      setValue("student_class_code", "");
      prevDepartmentCode.current = departmentCode;
    }
  }, [departmentCode, setValue]);

  return (
    <SelectInput
      {...props}
      source="student_class_code"
      label="학반"
      choices={choices}
      disabled={isLoading || !departmentCode}
    />
  );
};

// =================================================
//   Filters
// =================================================
const UserFilters = [
  <ReferenceInput
    source="department_code"
    reference="departments"
    alwaysOn
    key="department-filter"
  >
    <AutocompleteInput
      label="학과 코드"
      optionText="name"
      size="small"
      sx={{ minHeight: 40, minWidth: 200, mb: 0.5, mt: 0.5 }}
    />
  </ReferenceInput>,

  <StudentClassFilter key="student-class-filter" alwaysOn />,

  <SelectInput
    source="user_type"
    label="유저 타입"
    choices={[
      { id: "student", name: "학생" },
      { id: "employee", name: "직원" },
      { id: "service", name: "서비스" },
      { id: "other", name: "기타" },
    ]}
    alwaysOn
  />,

  <SelectInput
    source="user_status"
    label="유저 상태"
    choices={[
      { id: "pending", name: "대기" },
      { id: "active", name: "활성" },
      { id: "graduated", name: "졸업" },
      { id: "leave", name: "휴학" },
      { id: "suspended", name: "정지" },
      { id: "withdrawn", name: "탈퇴" },
      { id: "expelled", name: "제적" },
    ]}
    alwaysOn
  />,
];

// =================================================
//   Custom Toolbar
// =================================================
const CustomToolbar = () => {
  const redirect = useRedirect();
  const handleCancel = () => redirect("/users");

  return (
    <Box sx={{ mt: 3 }}>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" color="inherit" onClick={handleCancel}>
          취소
        </Button>
        <Button variant="contained" type="submit" sx={{ boxShadow: 3 }}>
          저장
        </Button>
      </Stack>
    </Box>
  );
};

// =================================================
//   LIST
// =================================================
export const UserList = () => {
  return (
    <List filters={UserFilters}>
      <DataTable rowClick={false}>
        <DataTable.Col>
          <AvatarField source="profile_image_url" />
        </DataTable.Col>
        <DataTable.Col source="id" label="유저 번호" />
        <DataTable.Col source="user_name" label="이름" />
        <DataTable.Col source="user_type" label="구분" />
        <DataTable.Col source="user_status" label="상태" />
        <DataTable.Col source="department_code" label="학과 이름">
          <ReferenceField source="department_code" reference="departments" link="show">
            <TextField source="name" />
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col source="student_class_code" label="학반 이름">
          <ReferenceField source="student_class_code" reference="studentclasses" link="show">
            <TextField source="name" />
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col source="user_roles" label="권한">
          <RolesField source="user_roles" />
        </DataTable.Col>
        <DataTable.Col><EditButton /></DataTable.Col>
        <DataTable.Col><DeleteButton /></DataTable.Col>
      </DataTable>
    </List>
  );
};

// =================================================
//   EDIT
// =================================================
export const UserEdit = () => {
  return (
    // <Edit>
      <Card sx={{ maxWidth: 700, margin: "24px auto", borderRadius: 4, p: 2, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            유저 정보 수정
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
            선택한 유저 정보를 수정할 수 있습니다.
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <SimpleForm toolbar={<CustomToolbar />}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextInput source="id" label="유저 번호" fullWidth disabled />
              </Grid>
              <Grid item xs={12}>
                <TextInput source="user_name" label="이름" fullWidth />
              </Grid>
            </Grid>
          </SimpleForm>
        </CardContent>
      </Card>
  );
};

// =================================================
//   CREATE
// =================================================
export const UserCreate = () => {
  return (
    // <Create>
      <Card sx={{ maxWidth: 700, margin: "24px auto", borderRadius: 4, p: 2, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            유저 추가
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
            새로운 유저를 생성해주세요.
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <SimpleForm toolbar={<CustomToolbar />}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextInput source="id" label="유저 번호" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextInput source="user_name" label="이름" fullWidth />
              </Grid>
            </Grid>
          </SimpleForm>
        </CardContent>
      </Card>
  );
};
