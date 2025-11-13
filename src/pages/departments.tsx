import {
  Create,
  DataTable,
  DeleteButton,
  Edit,
  EditButton,
  List,
  SimpleForm,
  TextInput,
} from "react-admin";

export const DepartmentList = () => {
  return (
    <List>
      <DataTable rowClick={false}>
        <DataTable.Col source="id" />
        <DataTable.Col source="name" />
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

export const DepartmentEdit = () => {
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

export const DepartmentCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="id" />
        <TextInput source="name" />
      </SimpleForm>
    </Create>
  );
};
