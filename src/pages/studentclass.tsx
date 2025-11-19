// src/pages/studentclass.tsx
import {
  AutocompleteInput,
  Create,
  DataTable,
  DeleteButton,
  Edit,
  EditButton,
  List,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
// import { Box } from "@mui/material";

const studentClassFilters = [
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
      sx={{ minHeight: 40 , minWidth: 200 , marginBottom:0.5 ,marginTop:0.5}}
    />
  </ReferenceInput>,
  <SelectInput
    source="status"
    label="상태"
    size="small"
    sx={{ minHeight: 40 , minWidth: 80 ,marginBottom:0.5,marginTop:0.5}}
    choices={[
      { id: "active", name: "활성" },
      { id: "graduated", name: "졸업" },
    ]}
    alwaysOn
    key="status-filter"
  />,
];

export const StudentClassList = () => {
  return (
    <List filters={studentClassFilters}>
      {/* <Box sx={{
        width: "100%",
        overflowX: "auto",
        whiteSpace: "nowrap"
      }}> */}
        <DataTable rowClick={false}>
          <DataTable.Col source="department_code" label="학과 이름">
            <ReferenceField source="department_code" reference="departments" link="show">
              <TextField source="name" />
            </ReferenceField>
          </DataTable.Col>
          <DataTable.Col source="id" label="학과 크드" />
          <DataTable.Col source="name" label="클래스" />
          <DataTable.Col source="admission_year" label="입학년" />
          <DataTable.Col source="graduation_year" label="졸업년" />
          <DataTable.Col source="status" label="상태" />
          <DataTable.Col>
            <EditButton />
          </DataTable.Col>
          <DataTable.Col>
            <DeleteButton />
          </DataTable.Col>
        </DataTable>
      {/* </Box> */}
    </List>
  );
};

export const StudentClassEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          source="id"
          disabled
        />
        <TextInput source="name" />
        <ReferenceInput source="department_code" reference="departments">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="admission_year" />
        <NumberInput source="graduation_year" />
        <SelectInput
          source="status"
          choices={[
            { id: "active", name: "Active" },
            { id: "graduated", name: "Graduated" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};

export const StudentClassCreate = () => {
  return (
    <Create redirect="list">
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="name" />
        <ReferenceInput source="department_code" reference="departments">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="admission_year" />
        <NumberInput source="graduation_year" />
        <SelectInput
          source="status"
          choices={[
            { id: "active", name: "Active" },
            { id: "graduated", name: "Graduated" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
};
