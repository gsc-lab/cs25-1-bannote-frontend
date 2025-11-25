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
  TimeInput,
  ArrayInput,
  SimpleFormIterator,
  DateInput,
  useRecordContext,
  useUpdate,
  useNotify,
  useGetOne,
  SaveButton,
  Toolbar,
} from "react-admin";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useState } from "react";

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

// TODO: 백엔드 완성 후 수정 필요
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      id={`studyroom-tabpanel-${index}`}
      style={{ display: value === index ? "block" : "none" }}
      {...other}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
};

const StudyroomEditContent = () => {
  const [tabValue, setTabValue] = useState(0);
  const record = useRecordContext();
  const notify = useNotify();
  const [updateBasic] = useUpdate();
  const [updateOperating] = useUpdate();

  const { data: studyroomData } = useGetOne(
    "studyrooms",
    { id: record?.id },
    { enabled: !!record?.id },
  );

  // 운영시간 데이터 가져오기
  const { data: operatingData } = useGetOne(
    "room-operating",
    { id: record?.id },
    { enabled: !!record?.id },
  );

  if (!record) return null;

  const handleBasicSave = async (data: any) => {
    try {
      await updateBasic("studyrooms", {
        id: record.id,
        data: {
          name: data.name,
          department_code: data.department_code,
          maximum_member: data.maximum_member,
        },
        previousData: record,
      });
      notify("기본 정보가 저장되었습니다", { type: "success" });
    } catch (error) {
      notify("저장 실패", { type: "error" });
    }
  };

  const handleOperatingSave = async (data: any) => {
    const updateSchedule = data.regular_schedule.map((schedule: any) => ({
      ...schedule,
      room_id: record.id,
    }));
    try {
      await updateOperating("room-operating", {
        id: record.id,
        data: { operating_hours: updateSchedule },
        previousData: record,
      });
      notify("운영시간이 저장되었습니다", { type: "success" });
    } catch (error) {
      notify("저장 실패", { type: "error" });
    }
  };

  const handleExceptionSave = async (data: any) => {
    try {
      // ISO 8601 형식을 HH:MM으로 변환
      const transformedExceptions = data.exceptions?.map((exception: any) => ({
        ...exception,
        start: exception.start
          ? new Date(exception.start).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          : exception.start,
        end: exception.end
          ? new Date(exception.end).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          : exception.end,
      }));

      await updateException("room-exception", {
        id: record.id,
        data: { exceptions: transformedExceptions },
        previousData: record,
      });
      notify("휴일/예외가 저장되었습니다", { type: "success" });
    } catch (error) {
      notify("저장 실패", { type: "error" });
    }
  };

  return (
    <Box>
      <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
        <Tab label="기본 정보" />
        <Tab label="정기 운영시간" />
        <Tab label="휴일/예외 설정" />
      </Tabs>

      {/* 기본 정보 탭 */}
      <TabPanel value={tabValue} index={0}>
        <SimpleForm
          record={studyroomData?.data}
          onSubmit={handleBasicSave}
          resetOptions={{ keepDirtyValues: true }}
        >
          <TextInput source="id" disabled label="스터디룸 코드" />
          <TextInput source="name" label="스터디룸 이름" />
          <ReferenceInput source="department_code" reference="departments">
            <SelectInput optionText="name" label="학과" />
          </ReferenceInput>
          <NumberInput source="maximum_member" label="최대 인원" />
        </SimpleForm>
      </TabPanel>

      {/* 정기 운영시간 탭 */}
      <TabPanel value={tabValue} index={1}>
        <SimpleForm
          record={{ regular_schedule: operatingData?.data || [] }}
          onSubmit={handleOperatingSave}
          resetOptions={{ keepDirtyValues: true }}
        >
          <Typography variant="h6" gutterBottom>
            요일별 운영시간 설정
          </Typography>
          <Box sx={{ mt: 3 }}>
            <ArrayInput source="regular_schedule" label="">
              <SimpleFormIterator
                inline
                disableReordering
                sx={{ width: "100%" }}
              >
                <SelectInput
                  source="day_of_week"
                  label="요일"
                  choices={[
                    { id: 1, name: "월요일" },
                    { id: 2, name: "화요일" },
                    { id: 3, name: "수요일" },
                    { id: 4, name: "목요일" },
                    { id: 5, name: "금요일" },
                    { id: 6, name: "토요일" },
                    { id: 7, name: "일요일" },
                  ]}
                  sx={{ minWidth: 120, mt: 0 }}
                />
                {/* TODO 시간은 10분 단위로 선택 가능하게 설정 */}
                <TextInput
                  source="opening_time"
                  label="시작 시간"
                  type="time"
                />
                <TextInput
                  source="closing_time"
                  label="종료 시간"
                  type="time"
                />
                <TextInput
                  source="day_maximum_time"
                  label="일 최대 이용 시간"
                  placeholder="03:00"
                  helperText="HH:MM 형식 (예: 03:00 = 3시간)"
                />
              </SimpleFormIterator>
            </ArrayInput>
          </Box>
        </SimpleForm>
      </TabPanel>

      {/* 휴일/예외 설정 탭 */}
      <TabPanel value={tabValue} index={2}>
        <SimpleForm record={record} onSubmit={handleExceptionSave}>
          <Typography variant="h6" gutterBottom>
            특정 날짜 예외 설정
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            정기 운영시간과 다르게 운영하거나 휴무하는 날짜를 추가하세요.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <ArrayInput source="exceptions" label="">
              <SimpleFormIterator inline sx={{ width: "100%" }}>
                <DateInput source="date" label="날짜" />
                <TextInput source="reason" label="사유" />
                <SelectInput
                  source="status"
                  label="운영 상태"
                  choices={[
                    { id: "closed", name: "휴무" },
                    { id: "custom", name: "시간 변경" },
                    { id: "24h", name: "24시간 운영" },
                  ]}
                  defaultValue="closed"
                />
                <TimeInput source="start" label="시작 시간 (변경 시)" />
                <TimeInput source="end" label="종료 시간 (변경 시)" />
              </SimpleFormIterator>
            </ArrayInput>
          </Box>
        </SimpleForm>
      </TabPanel>
    </Box>
  );
};

export const StudyroomEdit = () => {
  return (
    <Edit>
      <StudyroomEditContent />
    </Edit>
  );
};
