//src/pages/AllowedDomains.tsx

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

// フィルター定義
const allowedDomainFilters = [
  <TextInput
    source="id"
    label="도메인"
    alwaysOn
    key="domain-filter"
    size="small"
    sx={{ minWidth: 200, marginBottom: 0.5, marginTop: 0.5 }}
  />,
  <TextInput
    source="created_by"
    label="등록자"
    alwaysOn
    key="created-by-filter"
    size="small"
    sx={{ minWidth: 150, marginBottom: 0.5, marginTop: 0.5 }}
  />,
];

export const AllowedDomainList = () => {
  return (
    <List filters={allowedDomainFilters}>
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
