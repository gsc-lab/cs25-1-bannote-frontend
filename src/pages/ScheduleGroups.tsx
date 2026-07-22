// src/pages/ScheduleGroups.tsx
import {
  AutocompleteInput,
  Create,
  DataTable,
  DeleteButton,
  Edit,
  EditButton,
  List,
  ReferenceArrayInput,
  ReferenceInput,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  useRedirect,
} from "react-admin";
import {
  Card,
  Typography,
  Divider,
  Box,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import { ColorInput } from "../components/common/ColorInput";

// ================= LIST ======================
export const ScheduleGroupsList = () => {
  return (
    <List>
      <DataTable rowClick={false}>
        <DataTable.Col source="id" label="그룹 ID" />
        <DataTable.Col source="group_name" label="그룹 이름" />
        <DataTable.Col source="group_description" label="그룹 설명" />
        <DataTable.Col source="group_type_id" label="그룹 타입" />

        <DataTable.Col
          source="color_default"
          label="기본 색상"
          render={(record: any) => (
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                backgroundColor: record.color_default,
                border: 1,
                borderColor: "divider",
              }}
            />
          )}
        />

        <DataTable.Col
          source="color_highlight"
          label="강조 색상"
          render={(record: any) => (
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 1,
                backgroundColor: record.color_highlight,
                border: 1,
                borderColor: "divider",
              }}
            />
          )}
        />

        <DataTable.Col
          source="tags"
          label="태그"
          render={(record: any) => (
            <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
              {record.tags?.map((tag: any, index: number) => (
                <Chip
                  key={tag.tag_id || `tag-${index}`}
                  label={tag.name}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          )}
        />

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
const ScheduleGroupsToolbar = () => {
  const redirect = useRedirect();

  const handleCancel = () => {
    redirect("/schedule-groups"); // ScheduleGroupsList の実URLに合わせる！
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
      <Button
        variant="outlined"
        color="inherit"
        onClick={handleCancel}
        sx={{ height: 45 }}
      >
        취소
      </Button>
      <Button
        variant="contained"
        type="submit"
        sx={{ boxShadow: 3, height: 45 }}
      >
        저장
      </Button>
    </Stack>
  );
};

export const ScheduleGroupsEdit = () => {
  // 서버로 보낼 때 tag_ids 변환
  const transform = (data: any) => {
    const transformed = { ...data };
    // tags를 제거하고 tag_ids만 전송
    delete transformed.tags;
    return transformed;
  };

  return (
    <Edit 
      transform={transform} 
      mutationMode="pessimistic"
      component="div"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          padding: 0
        }}
    >
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
          스케줄 그룹 수정
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          기존 스케줄 그룹을 수정해주세요.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <SimpleForm toolbar={<ScheduleGroupsToolbar />}>
          <Stack spacing={3} sx={{ width: "100%" }}>
            <TextInput source="group_name" label="스케줄 그룹 이름" fullWidth />

            <TextInput
              source="group_description"
              label="스케줄 그룹 설명"
              fullWidth
              multiline
              minRows={3}
            />

            <SelectInput
              source="group_type_id"
              label="그룹 타입"
              choices={[
                { id: 1, name: "긴급" },
                { id: 2, name: "정규 수업" },
                { id: 3, name: "일반" },
              ]}
              fullWidth
            />

            <Stack direction="row" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <ColorInput source="color_default" label="기본 색상" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <ColorInput source="color_highlight" label="강조 색상" />
              </Box>
            </Stack>

            <ReferenceArrayInput source="tag_ids" reference="schedule-tags">
              <SelectArrayInput optionText="name" label="태그 선택" fullWidth />
            </ReferenceArrayInput>
          </Stack>
        </SimpleForm>
      </Card>
    </Edit>
  );
};

export const ScheduleGroupsCreate = () => {
  return (
    <Create
      component="div"
      // transform={transform}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          padding: 0
    }}
    >
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
          스케줄 그룹 생성
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          새로운 스케줄 그룹을 생성해주세요.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <SimpleForm toolbar={<ScheduleGroupsToolbar />}>
          <Stack spacing={3} sx={{ width: "100%" }}>
            <TextInput source="group_name" label="스케줄 그룹 이름" fullWidth />

            <TextInput
              source="group_description"
              label="스케줄 그룹 설명"
              fullWidth
              multiline
              minRows={3}
            />

            <SelectInput
              source="group_type_id"
              label="그룹 타입"
              choices={[
                { id: 1, name: "긴급" },
                { id: 2, name: "정규 수업" },
                { id: 3, name: "일반" },
              ]}
              fullWidth
            />

            <Stack direction="row" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <ColorInput source="color_default" label="기본 색상" />
              </Box>
              <Box sx={{ flex: 1 }}>
                <ColorInput source="color_highlight" label="강조 색상" />
              </Box>
            </Stack>

            <ReferenceArrayInput source="tag_ids" reference="schedule-tags">
              <SelectArrayInput optionText="name" label="태그 선택" fullWidth />
            </ReferenceArrayInput>
          </Stack>
        </SimpleForm>
      </Card>
    </Create>
  );
};
