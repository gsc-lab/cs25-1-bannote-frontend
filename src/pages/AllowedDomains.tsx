import {
  Create,
  DataTable,
  DeleteButton,
  EditButton,
  List,
  SimpleForm,
  TextInput,
} from "react-admin";
import { formatFirestoreTimestamp } from "../utils/dateUtils";

export const AllowedDomainList = () => {
  return (
    <List>
      <DataTable rowClick={false}>
        <DataTable.Col source="id" label="도메인" />
        <DataTable.Col source="created_by" label="등록자" />
        <DataTable.Col
          source="created_at"
          label="등록일자"
          render={(record) => formatFirestoreTimestamp(record.created_at)}
        />
        <DataTable.Col>
          <DeleteButton />
        </DataTable.Col>
      </DataTable>
    </List>
  );
};

export const AllowedDomainCreate = () => {
  const transform = (data: any) => ({
    ...data,
    id: data.domain, // domain 값을 id로도 사용
  });

  return (
    <Create transform={transform}>
      <SimpleForm>
        <TextInput source="domain" label="도메인" />
      </SimpleForm>
    </Create>
  );
};
