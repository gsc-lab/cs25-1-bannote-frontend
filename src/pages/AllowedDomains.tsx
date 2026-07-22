//src/pages/AllowedDomains.tsx

import {
  Create,
  DataTable,
  DeleteButton,
  EditButton,
  List,
  SimpleForm,
  TextInput,
  useRedirect,

} from "react-admin";

import { Card, CardContent, Typography, Divider, Grid, Box, Button, Stack } from "@mui/material";

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


// =================== Custom Toolbar ===================
const AllowedDomainToolbar = () => {
  const redirect = useRedirect();

  const handleCancel = () => {
    redirect("/alloweddomains"); // AllowedDomainList の URL
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button variant="outlined" color="inherit" onClick={handleCancel}>
          취소
        </Button>
        <Button
          variant="contained"
          sx={{ boxShadow: 3 }}
          type="submit"
        >
          저장
        </Button>
      </Stack>
    </Box>
  );
};

// =================== CREATE ===================
export const AllowedDomainCreate = () => {
  const transform = (data: any) => ({
    ...data,
    id: data.domain, // domain を id にも設定
  });

  return (
    <Create 
      component="div"
      transform={transform}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          padding: 0
  }}
    >
      <Card sx={{ maxWidth: 650, margin: "24px auto", borderRadius: 4, p: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Allowed Domain 추가
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            새로운 도메인을 등록해주세요.
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <SimpleForm toolbar={<AllowedDomainToolbar />}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextInput
                  source="domain"
                  label="도메인"
                  fullWidth
                  sx={{
                    "& .MuiInputBase-root": {  height: 46, fontSize: 15 },
                  }}
                />
              </Grid>
            </Grid>
          </SimpleForm>
        </CardContent>
      </Card>
    </Create> 
  );
};