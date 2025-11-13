import {
  AutocompleteInput,
  Create,
  DataTable,
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

const studentClassFilters = [
  <ReferenceInput
    source="department_code"
    reference="departments"
    label="Department"
    alwaysOn
  >
    <AutocompleteInput optionText="name" />
  </ReferenceInput>,
  <SelectInput
    source="status"
    label="Status"
    choices={[
      { id: "active", name: "Active" },
      { id: "graduated", name: "Graduated" },
    ]}
    alwaysOn
  />,
];

export const StudentClassList = () => {
  return (
    <List filters={studentClassFilters}>
      <DataTable rowClick={false}>
        <DataTable.Col source="department_code" label="Department">
          <ReferenceField
            source="department_code"
            reference="departments"
            link="show"
          >
            <TextField source="name" />
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col source="id" />
        <DataTable.Col source="name" />
        <DataTable.Col source="admission_year" />
        <DataTable.Col source="graduation_year" />
        <DataTable.Col source="status" />
        <DataTable.Col>
          <EditButton />
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

export const StudentClassEdit = () => {
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
