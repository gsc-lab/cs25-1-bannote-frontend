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
  useRedirect,
} from "react-admin";
import {
  Card,
  CardContent,
  Typography,
  Divider,
  Grid,
  Box,
  Button,
  Stack,
} from "@mui/material";

// ================= FILTER ======================
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
      sx={{ minHeight: 40, minWidth: 200, marginBottom: 0.5, marginTop: 0.5 }}
    />
  </ReferenceInput>,

  <SelectInput
    source="status"
    label="상태"
    size="small"
    choices={[
      { id: "active", name: "활성" },
      { id: "graduated", name: "졸업" },
    ]}
    alwaysOn
    key="status-filter"
    sx={{ minHeight: 40, minWidth: 100, marginBottom: 0.5, marginTop: 0.5 }}
  />,
];

// ================= LIST ======================
export const StudentClassList = () => {
  return (
    <List filters={studentClassFilters}>
      <DataTable rowClick={false}>
        <DataTable.Col source="department_code" label="학과 이름">
          <ReferenceField source="department_code" reference="departments" link="show">
            <TextField source="name" />
          </ReferenceField>
        </DataTable.Col>
        <DataTable.Col source="id" label="학과 코드" />
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
    </List>
  );
};

// ================= CUSTOM TOOLBAR ======================
const StudentClassToolbar = () => {
  const redirect = useRedirect();

  const handleCancel = () => {
    redirect("/studentclasses"); // StudentClassList の実URLに合わせる！
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
      <Button variant="outlined" color="inherit" onClick={handleCancel} sx={{ height: 45 }}>
        취소
      </Button>
      <Button variant="contained" type="submit" sx={{ boxShadow: 3, height: 45 }}>
        저장
      </Button>
    </Stack>
  );
};


export const StudentClassEdit = () => {
  return (
    // <Edit>
      <Card
        sx={{
          maxWidth: 800,
          margin: "32px auto",
          borderRadius: 4,
          p: 4,
          boxShadow: "rgba(0,0,0,0.15) 0px 4px 18px",
        }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
          클래스 정보 수정
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          클래스 정보를 아래에서 수정할 수 있습니다.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        {/* ========== FORM AREA ========== */}
        <SimpleForm toolbar={<StudentClassToolbar />}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput source="id" label="클래스 코드" disabled fullWidth />
            </Grid>

            <Grid item xs={12}>
              <TextInput source="name" label="클래스 이름" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <ReferenceInput source="department_code" reference="departments">
                <SelectInput optionText="name" label="학과 선택" fullWidth />
              </ReferenceInput>
            </Grid>

            <Grid item xs={6}>
              <NumberInput source="admission_year" label="입학년" fullWidth />
            </Grid>

            <Grid item xs={6}>
              <NumberInput source="graduation_year" label="졸업년" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <SelectInput
                source="status"
                label="상태"
                choices={[
                  { id: "active", name: "활성" },
                  { id: "graduated", name: "졸업" },
                ]}
                fullWidth
              />
            </Grid>
          </Grid>
        </SimpleForm>
      </Card>
  );
};


export const StudentClassCreate = () => {
  return (
    // <Create>
      <Card
        sx={{
          maxWidth: 800,
          margin: "32px auto",
          borderRadius: 4,
          p: 4,
          boxShadow: "rgba(0,0,0,0.15) 0px 4px 18px",
        }}
      >
        <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
          클래스 생성
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          새로운 클래스를 생성해주세요.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <SimpleForm toolbar={<StudentClassToolbar />}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput source="id" label="클래스 코드" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <TextInput source="name" label="클래스 이름" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <ReferenceInput source="department_code" reference="departments">
                <SelectInput optionText="name" label="학과 선택" fullWidth />
              </ReferenceInput>
            </Grid>

            <Grid item xs={6}>
              <NumberInput source="admission_year" label="입학년" fullWidth />
            </Grid>

            <Grid item xs={6}>
              <NumberInput source="graduation_year" label="졸업년" fullWidth />
            </Grid>

            <Grid item xs={12}>
              <SelectInput
                source="status"
                label="상태"
                choices={[
                  { id: "active", name: "활성" },
                  { id: "graduated", name: "졸업" },
                ]}
                fullWidth
              />
            </Grid>
          </Grid>
        </SimpleForm>
      </Card>

  );
};
