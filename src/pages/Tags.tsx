// src/pages/Tags.tsx
import {
  // Create,
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
  useRedirect,
  Create,
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

// =================== LIST ===================
export const TagsList = () => (
  <List>
    <Datagrid
      rowClick="edit"
      sx={{
        "& .RaDatagrid-headerCell": { fontWeight: 700 },
      }}
    >
      <TextField source="id" label="태그 코드" />
      <TextField source="name" label="태그 이름" />
      <DeleteButton />
    </Datagrid>
  </List>
);

// =================== CREATE ===================
export const TagsCreate = () => (
  <Create sx={{ backgroundColor: "#1546" }}>
    <Card
      sx={{
        maxWidth: 650,
        margin: "24px auto",
        borderRadius: 4,
        p: 2,
        boxShadow: 6,
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          태그 생성
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          새로운 태그 정보를 등록해주세요.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <SimpleForm toolbar={<CustomToolbar />}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput source="name" label="태그 이름" fullWidth />
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
    redirect("/schedule-tags"); // TagsList の URL
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
