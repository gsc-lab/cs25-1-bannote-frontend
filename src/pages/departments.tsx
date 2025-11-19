import {
  Create,
  Datagrid,
  DeleteButton,
  Edit,
  EditButton,
  List,
  SimpleForm,
  TextInput,
  TextField,
  ReferenceInput,
  AutocompleteInput,
  SelectInput,
} from "react-admin";

// フィルター定義
const departmentFilters = [
  <ReferenceInput
    source="id"
    reference="departments"
    alwaysOn
    key="department-id-filter"
  >
    <AutocompleteInput
      label="학과 코드"
      optionText="id"
      size="small"
      sx={{ minHeight: 40, minWidth: 150, marginBottom: 0.5, marginTop: 0.5 }}
    />
  </ReferenceInput>,
  <ReferenceInput
    source="name"
    reference="departments"
    alwaysOn
    key="department-name-filter"
  >
    <AutocompleteInput
      label="학과 이름"
      optionText="name"
      size="small"
      sx={{ minHeight: 40, minWidth: 200, marginBottom: 0.5, marginTop: 0.5 }}
    />
  </ReferenceInput>,
  <SelectInput
    source="status"
    label="상태"
    size="small"
    choices={[
      { id: "active", name: "활성" },
      { id: "inactive", name: "비활성" },
    ]}
    alwaysOn
    key="status-filter"
    sx={{ minHeight: 40, minWidth: 100, marginBottom: 0.5, marginTop: 0.5 }}
  />,
];

export const DepartmentList = () => (
  <List filters={departmentFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="학과 코드" />
      <TextField source="name" label="학과 이름" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const DepartmentEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" label="학과 코드" disabled />
      <TextInput source="name" label="학과 이름" />
    </SimpleForm>
  </Edit>
);

export const DepartmentCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="id" label="학과 코드" />
      <TextInput source="name" label="학과 이름" />
    </SimpleForm>
  </Create>
);
