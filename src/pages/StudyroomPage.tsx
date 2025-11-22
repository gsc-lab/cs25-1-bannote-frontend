// src/pages/studyroomPage.tsx
import {
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

export const StudyroomList = () => {
  return (
    <List>
      <DataTable rowClick={false}>
        <DataTable.Col source="department_code" label="학과 이름">
          <ReferenceField
            source="department_code"
            reference="departments"
            link="show"
          >
            <TextField source="name" />
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col source="id" label="코드" />
        <DataTable.Col source="name" label="스터디룸 이름" />
        <DataTable.Col source="maximum_member" label="최대 인원" />
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

export const StudyroomCreate = () => {
  return (
    <Create redirect="list">
      <SimpleForm>
        <TextInput source="name" label="스터디룸 이름" />
        <ReferenceInput source="department_code" reference="departments">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="maximum_member" label="최대 인원" />
      </SimpleForm>
    </Create>
  );
};

export const StudyroomEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="name" label="스터디룸 이름" />
        <ReferenceInput source="department_code" reference="departments">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="maximum_member" label="최대 인원" />
      </SimpleForm>
    </Edit>
  );
};
