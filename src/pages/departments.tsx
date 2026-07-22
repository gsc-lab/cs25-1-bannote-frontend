// src/pages/departments.tsx
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
  useRedirect
} from "react-admin";

import { Card, CardContent, Typography, Divider, Grid, Box, Button, Stack } from "@mui/material";

// =================== Filters ===================
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

// =================== LIST ===================
export const DepartmentList = () => (
  <List filters={departmentFilters}>
    <Datagrid
      rowClick="edit"
      sx={{
        "& .RaDatagrid-headerCell": {  fontWeight: 700 },
      }}
    >
      <TextField source="id" label="학과 코드" />
      <TextField source="name" label="학과 이름" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// =================== EDIT ===================
export const DepartmentEdit = () => (
  <Edit
    component="div"
    // transform={transform}
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: 0
      }}
  >
    <Card sx={{ maxWidth: 650, margin: "24px auto", borderRadius: 4, p: 2, boxShadow: 6 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          학과 정보 수정
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          학과 정보를 수정할 수 있습니다.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <SimpleForm toolbar={<CustomToolbar />}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput source="id" label="학과 코드" disabled fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextInput source="name" label="학과 이름" fullWidth />
            </Grid>
          </Grid>
        </SimpleForm>
      </CardContent>
    </Card>
 </Edit>
);

// =================== CREATE ===================

export const DepartmentCreate = () => (
  <Create
    component="div"
    // transform={transform}
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: 0
      }}
  >
    <Card sx={{ maxWidth: 650, margin: "24px auto", borderRadius: 4, p: 2, boxShadow: 6 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          학과 생성
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          새로운 학과 정보를 등록해주세요.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <SimpleForm toolbar={<CustomToolbar />}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput source="id" label="학과 코드" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextInput source="name" label="학과 이름" fullWidth />
            </Grid>
          </Grid>
        </SimpleForm>
      </CardContent>
    </Card>
  </Create>
);


// =================== Custom Buttons ===================
const CustomToolbar = () => {
  const redirect = useRedirect();

  const handleCancel = () => {
    redirect("/departments"); // DepartmentList の URL
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
          type="submit" // submitでフォーム保存
        >
          저장
        </Button>
      </Stack>
    </Box>
  );
};

export default CustomToolbar;
