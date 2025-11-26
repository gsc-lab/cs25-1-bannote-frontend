import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import {
  SimpleForm,
  TextInput,
  DateTimeInput,
  required,
  useNotify,
  useCreate,
  Toolbar,
  SaveButton,
} from "react-admin";
import { Button } from "@mui/material";
import dayjs from "dayjs";

interface CreateResourceModalProps {
  open: boolean;
  onClose: () => void;
  start: Date | null;
  end: Date | null;
  resourceId: number | null;
}

const CreateReservationModal = ({
  open,
  onClose,
  start,
  end,
  resourceId,
}: CreateResourceModalProps) => {
  const notify = useNotify();
  const [create] = useCreate();

  const handleSubmit = async (data: any) => {
    try {
      await create("reservations", {
        data: {
          start_time: dayjs(data.start_time).format("YYYY-MM-DDTHH:mm:ss[Z]"),
          end_time: dayjs(data.end_time).format("YYYY-MM-DDTHH:mm:ss[Z]"),
          room_id: data.room_id,
          purpose: data.purpose,
          user_code: data.user_code,
        },
      });
      notify("예약이 생성되었습니다", { type: "success" });
      onClose();
    } catch (error) {
      notify("예약 생성 실패", { type: "error" });
    }
  };

  const defaultValues = {
    start_time: start,
    end_time: end,
    room_id: resourceId,
    purpose: "",
    user_code: "",
  };

  const CustomToolbar = () => (
    <Toolbar>
      <SaveButton label="생성" />
      <Button onClick={onClose}>취소</Button>
    </Toolbar>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>새 예약 만들기</DialogTitle>
      <DialogContent>
        <SimpleForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          toolbar={<CustomToolbar />}
        >
          <TextInput
            source="purpose"
            label="예약 목적"
            validate={required()}
            fullWidth
            multiline
            rows={1}
          />
          <DateTimeInput
            source="start_time"
            label="시작 시간"
            validate={required()}
            fullWidth
          />
          <DateTimeInput
            source="end_time"
            label="종료 시간"
            validate={required()}
            fullWidth
          />
          <TextInput source="room_id" label="스터디룸 ID" readOnly fullWidth />
          <TextInput
            source="user_code"
            label="유저 코드"
            validate={required()}
            fullWidth
          />
        </SimpleForm>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReservationModal;
