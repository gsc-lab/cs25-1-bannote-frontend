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
} from "react-admin";
import { useWatch, useFormContext } from "react-hook-form";
import { useEffect, useRef } from "react";
import AvatarField from "../components/common/AvatarField";
import RolesField from "../components/common/RolesField";

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

const UserFilters = [
  <ReferenceInput
    source="department_code"
    reference="departments"
    label="학과"
    alwaysOn
  >
    <AutocompleteInput optionText="name" />
  </ReferenceInput>,
  <StudentClassFilter key="student_class_filter" alwaysOn />,
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
          <ReferenceField
            source="department_code"
            reference="departments"
            link="show"
          >
            <TextField source="name" />
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col source="student_class_code" label="학반 이름">
          <ReferenceField
            source="student_class_code"
            reference="studentclasses"
            link="show"
          >
            <TextField source="name" />
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col source="user_roles" label="권한">
          <RolesField source="user_roles" />
        </DataTable.Col>
        <DataTable.Col>
          <EditButton />
        </DataTable.Col>
        <DataTable.Col>
          <DeleteButton />
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

export const UserEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source="id"
          slotProps={{
            input: { disabled: true },
          }}
        />
        <TextInput source="name" />
      </SimpleForm>
    </Edit>
  );
};

export const UserCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );
};
